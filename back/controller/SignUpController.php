<?php
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

require_once '../src/User/Application/SignUpUser.php';
require_once '../src/User/Infrastructure/UserRepository.php';
require_once '../src/User/Domain/Exceptions/EmptyFieldException.php';

class SignUpController
{
	private $userRepository;

	public function __construct()
	{
		$this->userRepository = new UserRepository();
	}

	public function handleRequest()
	{
		try {
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {
				$this->handleSignUp();
			} else {
				throw new Exception("Not Allowed HTTP method");
			}
		} catch (Exception $e) {
			http_response_code(400);
			echo json_encode(["status" => "error", "message" => $e->getMessage()]);
		}
	}

	private function handleSignUp()
	{
		try {
			$userData = json_decode(file_get_contents('php://input'), true);
			$userData['name'] = $userData['name'] ?? '';
			$userData['surname'] =  $userData['surname'] ?? '';
			$userData['email'] = $userData['email'] ?? '';
			$userData['password'] = $userData['password'] ?? '';

			foreach ($userData as $data) {
				if (empty($data) || $data === null) {
					throw new EmptyFieldException();
				}
			}

			$signUpUser = new SignUpUser($userData, $this->userRepository);
			$signUpUser->execute();

			http_response_code(200);
			echo json_encode(["status" => "success", "message" => "Sign up successfully completed!"]);
		} catch (EmptyFieldException $e) {
			http_response_code(400);
			echo json_encode(["status" => "error", "message" => $e->getMessage()]);
		} catch (Exception $e) {
			http_response_code(500);
			echo json_encode(["status" => "error", "message" => $e->getMessage()]);
		}
	}
}

$controller = new SignupController();
$controller->handleRequest();