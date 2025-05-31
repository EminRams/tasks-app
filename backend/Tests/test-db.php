<?php
require_once '../database.php';

if ($connection && $connection->query("SELECT 1")) {
    echo "Conexión a la base de datos exitosa.";
} else {
    echo "Error en la conexión a la base de datos.";
}
