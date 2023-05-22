<?php
ini_set('display_errors',1); error_reporting(E_ALL);

require_once '../src/Application/SignUpUser.php';
require_once '../src/Infrastructure/UserRepository.php';

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
			print_r('fdsfsd'); exit;

			if ($_SERVER['REQUEST_METHOD'] === 'POST') {
				$this->handleSignUp();
			} else {
				http_response_code(405);
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
			$userData = [];
			$userData['name'] =  $_POST['name'] ?? '';
			$userData['surname'] =  $_POST['surname'] ?? '';
			$userData['email'] = $_POST['email'] ?? '';
			$userData['password'] = $_POST['password'] ?? '';

			foreach ($userData as $data) {
				if (empty($data)) {
					throw new Exception("Fields can not be empty.");
				}
			}

			$signUpUser = new SignUpUser($userData, $this->userRepository);
			$signUpUser->execute();
			echo json_encode(["status" => "success", "message" => "Sign up successfully completed"]);
		} catch (Exception $e) {
			http_response_code(400);
			echo json_encode(["status" => "error", "message" => $e->getMessage()]);
		}
	}
}

$controller = new SignupController();
$controller->handleRequest();
