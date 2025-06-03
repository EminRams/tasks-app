<?php

require_once __DIR__ . '/../Database.php';

class AuthController
{
    private $db;

    public function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function register($data)
    {
        $username = htmlspecialchars(trim($data['username'] ?? ''));
        $email = htmlspecialchars(trim($data['email'] ?? ''));
        $password = trim($data['password'] ?? '');
        $confirmPassword = trim($data['confirm_password'] ?? '');

        // Validar campos vacios
        if (empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
            http_response_code(400);
            echo json_encode(['error' => 'Todos los campos son requeridos.']);
            return;
        }
        // Validar formato de email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Correo electronico invalido.']);
            return;
        }
        // Validar constraseña
        if ($password !== $confirmPassword) {
            http_response_code(400);
            echo json_encode(['error' => 'La contraseñas no coinciden.']);
            return;
        }

        try {
            // Verificar si el correo ya existe
            // $statement = $this->db->prepare("SELECT id FROM users WHERE email = ?");
            $statement = $this->db->prepare("CALL sp_get_user_by_email(?)");
            $statement->execute([$email]);
            if ($statement->fetch()) {
                http_response_code(409);
                echo json_encode(['error' => 'El correo electronico ya existe.']);
                return;
            }

            // Crear usuario
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            $statement = $this->db->prepare("CALL sp_insert_user(?, ?, ?)");
            $statement->execute([$username, $email, $hashedPassword]);

            http_response_code(201);
            echo json_encode(['message' => 'Usuario registrado correctamente.']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error en el servidor: ' . $e->getMessage()]);
        }
    }

    public function login($data)
    {
        $email = htmlspecialchars(trim($data['email'] ?? ''));
        $password = trim($data['password'] ?? '');

        // Validar campos vacios
        if (empty($email) || empty($password)) {
            http_response_code(400);
            echo json_encode(['error' => 'Todos los campos son requeridos.']);
            return;
        }
        // Validar formato de email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Correo electronico invalido.']);
            return;
        }

        // Recuperar usuario e iniciar sesión
        try {
            $statement = $this->db->prepare("CALL sp_get_user_by_email(?)");
            $statement->execute([$email]);
            $user = $statement->fetch(PDO::FETCH_ASSOC);

            // Validar si el usuario existe y la contraseña es correcta
            if (!$user || !password_verify($password, $user['password'])) {
                http_response_code(401);
                echo json_encode(['error' => 'Credenciales invalidas.']);
                return;
            }

            // Iniciar sesión
            session_start();
            $_SESSION['user_id'] = $user['id'];

            http_response_code(200);
            echo json_encode(['message' => 'Inicio de sesión exitoso.', 'user_id' => $user['id']]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error en el servidor: ' . $e->getMessage()]);
        }
    }

    public function logout()
    {
        try {
            // Cerrar sesión y destruir la sesión
            session_start();
            session_unset();
            session_destroy();

            http_response_code(200);
            echo json_encode(['message' => 'Sesión cerrada correctamente.']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error en el servidor: ' . $e->getMessage()]);
        }
    }
}
