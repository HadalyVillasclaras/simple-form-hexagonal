<?php

class Email
{
	private string $email;

	public function __construct(string $email)
	{
		$this->validateEmail($email);
		// $this->isDefined($email);
		$this->email = $email;
	}

	public function value(): string
	{
		return $this->email;
	}

	// private function isDefined(string | null $email) {
	// 	if ($email === '' || $email === null ) {
	// 		throw new Exception(("Email must be defined"));
	// 	}
	// }

	private function validateEmail(string $email): void
	{
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			throw new Exception("Invalid email format.");
		}
	}
}
