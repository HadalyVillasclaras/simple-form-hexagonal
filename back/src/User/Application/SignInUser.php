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
        $email = new Email($this->email);
        $signInUser = $this->userRepositoryInterface->getUserByEmail($email);

        if (
            !isset($signInUser['email']) || 
            !password_verify($this->password, $signInUser['password'])
        ) {
            throw new Exception("Invalid credentials.");
        }

        $user = [
            "surname" => $signInUser['surname'],
            "email" => $signInUser['email']
        ];

        return $user;
    }
}