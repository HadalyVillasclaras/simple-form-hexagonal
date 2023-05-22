<?php

require_once 'Connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $connection = new Connection();
        $stmt = $connection->Connect()->prepare("SELECT * FROM User");

        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($users);
    
    } catch(PDOException $e) {
        http_response_code(500);
        echo "Error: " . $e->getMessage();
    }
}

$connection = null; 

?>
