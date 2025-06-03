<?php

require_once __DIR__ . '/../../Controllers/TaskController.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($_GET['id'])) {
    $taskId = intval($_GET['id']);

    $taskController = new TaskController();
    $taskController->delete($taskId);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo no permitido.']);
}
