<?php

require_once __DIR__ . '/../Database.php';

class TaskController
{
    private $db;

    public function __construct()
    {
        session_start();

        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(['error' => 'No autorizado.']);
            exit;
        }

        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function index()
    {
        // Obtener las tareas del usuario
        try {
            $statement = $this->db->prepare("CALL sp_get_tasks_by_user(?)");
            $statement->execute([$_SESSION['user_id']]);
            $tasks = $statement->fetchAll(PDO::FETCH_ASSOC);

            http_response_code(200);
            echo json_encode($tasks);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error en el servidor: ' . $e->getMessage()]);
        }
    }

    public function create($data)
    {
        $title = trim($data['title'] ?? '');
        $description = trim($data['description'] ?? '');
        $dueDate = $data['due_date'] ?? null;

        // Validar campos vacios
        if (empty($title) || empty($description || !isset($dueDate))) {
            http_response_code(400);
            echo json_encode(['error' => 'Todos los campos son requeridos.']);
            return;
        }

        // Insertar la tarea en la base de datos
        try {
            $statement = $this->db->prepare("CALL sp_insert_task(?, ?, ?, ?)");
            $statement->execute([$_SESSION['user_id'], $title, $description, $dueDate]);

            http_response_code(201);
            echo json_encode(['message' => 'Tarea creada correctamente.']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error en el servidor: ' . $e->getMessage()]);
        }
    }

    public function delete($id)
    {
        $id = trim($id ?? '');

        // Validar ID
        if (empty($id)) {
            http_response_code(400);
            echo json_encode(['error' => 'El ID de la tarea es requerido.']);
            return;
        }

        try {
            // Validar que la tarea exista y pertenezca al usuario
            $statement = $this->db->prepare("CALL sp_get_task_by_id(?, ?)");
            $statement->execute([$id, $_SESSION['user_id']]);

            if (!$statement->fetch(PDO::FETCH_ASSOC)) {
                http_response_code(500);
                echo json_encode(['error' => 'Tarea no encontrada.']);
                return;
            }

            // Eliminar la tarea en la base de datos
            $statement = $this->db->prepare('CALL sp_delete_task(?, ?)');
            $statement->execute([$id, $_SESSION['user_id']]);

            http_response_code(201);
            echo json_encode(['message' => 'Tarea eliminada correctamente.']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error en el servidor: ' . $e->getMessage()]);
        }
    }
}
