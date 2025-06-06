<?php

require_once __DIR__ . '/../../Controllers/TaskController.php';

$origin = $_SERVER['FRONTEND_HOST'] ?? 'http://localhost:5174';

header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    session_start();
    $taskController = new TaskController();
    $taskController->index();
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo no permitido.']);
}
