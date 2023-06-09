<?php
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

require_once '../src/User/Application/SignInUser.php';
require_once '../src/User/Infrastructure/UserRepository.php';
require_once '../src/User/Domain/Exceptions/EmptyFieldException.php';

class SigninController {
    private $userRepository;

    public function __construct() {
        $this->userRepository = new UserRepository();
    }

    public function handleRequest()
    {
      try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
          $this->handleSignIn();
        } else {
          http_response_code(405);
          throw new Exception("Not Allowed HTTP method");
        }
      } catch (Exception $e) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
      }
    }

    private function handleSignIn() {
      try {
        $userData = json_decode(file_get_contents('php://input'), true);
        $userData['email'] = $userData['email'] ?? '';
        $userData['password'] = $userData['password'] ?? '';

        foreach ($userData as $data) {
          if (empty($data)) {
            throw new EmptyFieldException();
          }
        }

        http_response_code(200);
        $signInUser = new SignInUser($userData, $this->userRepository);
        $user = $signInUser->execute();
        echo json_encode(["status" => "success", "message" => "Sign in successfully completed!", "data" => $user], JSON_UNESCAPED_UNICODE);
      } catch (EmptyFieldException $e) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
      } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
      }
    }
}

$controller = new SigninController();
$controller->handleRequest();