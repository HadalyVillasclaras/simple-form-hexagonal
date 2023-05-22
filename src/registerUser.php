<?php

require_once 'Connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $name = $_POST['nombre'];
  $first_surname = $_POST['primer-apellido'];
  $second_surname = $_POST['segundo-apellido'];
  $email = $_POST['email'];
  $password = $_POST['password'];

  if (empty($name) || empty($first_surname) || empty($second_surname) || empty($email) || empty($password)) {
    echo "Todos los campos son requeridos.";
    return;
  }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      echo "El formato de correo electrónico no es válido.";
      return;
  }

  if (strlen($password) < 4 || strlen($password) > 8) {
      echo "La contraseña debe tener entre 4 y 8 caracteres.";
      return;
  }
  

  try {
      $connection = new Connection();
      $stmt = $connection->Connect()->prepare("INSERT INTO User (name, first_surname, second_surname, email, password) VALUES (:name, :first_surname, :second_surname, :email, :password)");
  
      $stmt->bindParam(':name', $name);
      $stmt->bindParam(':first_surname', $first_surname);
      $stmt->bindParam(':second_surname', $second_surname);
      $stmt->bindParam(':email', $email);
      
      $hashed_password = password_hash($password, PASSWORD_DEFAULT);
      $stmt->bindParam(':password', $hashed_password);
      
      $stmt->execute();
  
      echo "Registro completado con éxito";
  
  } catch(PDOException $e) {
    echo $e;
    // if (strpos($e->getMessage(), '1062') !== false) {
    //     http_response_code(409);
    //     echo "El correo electrónico ya está registrado.";
    // } else {
    //     http_response_code(500);
    //     echo "Error: " . $e->getMessage();
    // }
}
  

}


$connection = null; 
