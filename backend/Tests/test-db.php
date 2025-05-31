<?php
require_once '../database.php';

header('Content-Type: application/json');

$database = new Database();

$database->getConnection();