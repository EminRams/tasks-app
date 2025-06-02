<?php

require_once __DIR__ . '/../../Controllers/AuthController.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $authController = new AuthController();
    $authController->logout();
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No se pudo cerrar la sesión.']);
}
