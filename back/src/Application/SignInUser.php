<?php
require_once __DIR__ . '/../Domain/UserRepositoryInterface.php';
require_once __DIR__ . '/../Domain/ValueObjects/Email.php';
require_once __DIR__ . '/../Domain/ValueObjects/Password.php';

class SignInUser
{
    private $email;
    private $password;

    private $userRepositoryInterface;

    public function __construct(array $userData, UserRepositoryInterface $userRepositoryInterface) 
    {
        $this->userRepositoryInterface = $userRepositoryInterface;

        $this->email = $userData['email'];
        $this->password = $userData['password'];
    }

    public function execute() 
    {
        $user = $this->userRepositoryInterface->getUserByEmail($this->email);
      
        if ($user === null) {
            throw new Exception("Email not found.");
        }

        if (!password_verify($this->password, $user->getPassword())) {
            throw new Exception("Incorrect password.");
        }

        return $user;
    }
}