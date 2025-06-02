<?php

require_once __DIR__ . '/../../Controllers/TaskController.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $taskController = new TaskController();
    $taskController->index();
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo no permitido.']);
}
