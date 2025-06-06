<?php
session_start();

$origin = $_SERVER['FRONTEND_HOST'] ?? 'http://localhost:5174';

header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Origin: http://127.0.0.1:5174');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET');
header("Content-Type: application/json");

if (isset($_SESSION['user_id'])) {
    echo json_encode(['user' => ['id' => $_SESSION['user_id']]]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Sesión expirada']);
}
