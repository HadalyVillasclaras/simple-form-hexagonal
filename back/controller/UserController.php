<?php
// ini_set('display_errors',1); error_reporting(E_ALL);
require_once '../src/Application/RegisterUser.php';
require_once '../src/Infrastructure/UserRepository.php';

class UserController {
    private $registerUser;

    public function __construct() {
        $userRepository = new UserRepository();
        $this->registerUser = new RegisterUser($userRepository);
    }

    public function handleRequest() {
        switch($_SERVER['REQUEST_METHOD']) {
            case 'POST':
                $this->handlePost();
                break;
            default:
                http_response_code(405);
                echo json_encode(["status" => "error", "message" => "Método no permitido"]);
        }
    }

    private function handlePost() {
        try {
            $userData = [];
            $userData['name'] =  $_POST['nombre'] ?? '';
            $userData['first_surname'] = $_POST['primer-apellido'] ?? '';
            $userData['second_surname'] = $_POST['segundo-apellido'] ?? '';
            $userData['email'] = $_POST['email'] ?? '';
            $userData['password'] = $_POST['password'] ?? '';

            $this->registerUser->execute($userData);

            echo json_encode(["status" => "success", "message" => "Registro completado con éxito"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    }
}

$controller = new UserController();
$controller->handleRequest();