<?php

require_once __DIR__ . '/../../Controllers/TaskController.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos invalidos.']);
        exit;
    }

    $taskController = new TaskController();
    $taskController->create($data);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo no permitido.']);
}