<?php

require_once __DIR__ . '/../../Controllers/AuthController.php';

$origin = $_SERVER['FRONTEND_HOST'] ?? 'http://localhost:5174';

header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $authController = new AuthController();
    $authController->logout();
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No se pudo cerrar la sesión.']);
}
