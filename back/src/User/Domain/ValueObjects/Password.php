<?php
require_once '../src/User/Domain/Exceptions/EmptyFieldException.php';

class Password
{
	private string $password;

	public function __construct(string $password)
	{
		$this->validatePassword($password);
		$this->isDefined($password);
		$this->password = $this->hashPassword($password);
	}

	public function value(): string
	{
		return $this->password;
	}

	private function validatePassword(string $password): void
	{
		if (strlen($password) < 6 || strlen($password) > 20) {
			throw new Exception("The password must be 6 to 20 characters long.");
		}

		if (!preg_match('/\d/', $password)) {
			throw new Exception("The password must contain at least one number.");
		}

		if (!preg_match('/[A-Z]/', $password)) {
			throw new Exception("The password must contain at least one capital letter.");
		}

		if (!preg_match('/[^a-zA-Z\d]/', $password)) {
			throw new Exception("The password must contain at least one symbol.");
		}
	}

	private function isDefined(string | null $password) {
		if ($password === '' || $password === null ) {
			throw new EmptyFieldException();
		}
	}

	private function hashPassword(string $password): string
	{
		return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
	}
}