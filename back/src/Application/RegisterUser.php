<?php

require_once __DIR__ . '/../Domain/UserRepositoryInterface.php';


class RegisterUser 
{
    private $name;
    private $firstSurname;
    private $secondSurname;
    private $email;
    private $password;

    private $userRepositoryInterface;

    public function __construct(UserRepositoryInterface $userRepositoryInterface) {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }

    public function execute(array $userData) {
        $this->name = $userData['name'];
        $this->firstSurname = $userData['first_surname'];
        $this->secondSurname = $userData['second_surname'];
        $this->email = $userData['email'];
        $this->password = $userData['password'];
        $this->validateUserData();

        $hashed_password = password_hash($this->password, PASSWORD_DEFAULT);
        $this->password = $hashed_password;

        $user = new User(
            $this->name,
            $this->firstSurname,
            $this->secondSurname,
            $this->email,
            $this->password
        );

        $this->userRepositoryInterface->addUser($user);
    }

    private function validateUserData() {
        if (empty($this->name) || empty($this->firstSurname) || empty($this->secondSurname) || empty($this->email) || empty($this->password)) {
            throw new Exception("Fields can not be empty.");
        }

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Invalid email format.");
        }

        if (strlen($this->password) < 4 || strlen($this->password) > 8) {
            throw new Exception("La contraseña debe tener entre 4 y 8 caracteres.");
        }
    }
}
