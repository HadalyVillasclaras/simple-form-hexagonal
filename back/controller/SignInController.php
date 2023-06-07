<?php
ini_set('display_errors',1); error_reporting(E_ALL);

require_once '../src/User/Application/SignInUser.php';
require_once '../src/User/Infrastructure/UserRepository.php';

class SigninController {
    private $userRepository;

    public function __construct() {
        $this->userRepository = new UserRepository();
    }

    public function handleRequest()
    {
      try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
          $this->handleSignIp();
        } else {
          http_response_code(405);
          throw new Exception("Not Allowed HTTP method");
        }
      } catch (Exception $e) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
      }
    }

    private function handleSignIp() {
      try {
        $userData = json_decode(file_get_contents('php://input'), true);
        $userData['email'] = $userData['email'] ?? '';
        $userData['password'] = $userData['password'] ?? '';
        foreach ($userData as $data) {
          if (empty($data)) {
            throw new Exception("Fields can not be empty.");
          }
        }
        $signInUser = new SignInUser($userData, $this->userRepository);
        $user = $signInUser->execute();
        echo json_encode(["status" => "success", "message" => "Sign in successfully completed!", "data" => $user], JSON_UNESCAPED_UNICODE);
      } catch (Exception $e) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
      }
        
    }
}

$controller = new SigninController();
$controller->handleRequest();