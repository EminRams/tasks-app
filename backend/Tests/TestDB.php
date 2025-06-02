<?php
require_once '../Database.php';

header('Content-Type: application/json');

$database = new Database();

$database->getConnection();