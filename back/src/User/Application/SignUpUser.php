<?php
require_once __DIR__ . '/../Domain/UserRepositoryInterface.php';
require_once __DIR__ . '/../Domain/ValueObjects/Email.php';
require_once __DIR__ . '/../Domain/ValueObjects/Password.php';

class SignUpUser 
{
    private $name;
    private $surname;
    private $email;
    private $password;

    private $userRepositoryInterface;

    public function __construct(array $userData, UserRepositoryInterface $userRepositoryInterface) 
    {
        $this->userRepositoryInterface = $userRepositoryInterface;

        $this->name = $userData['name'];
        $this->surname = $userData['surname'];
        $this->email = $userData['email'];
        $this->password = $userData['password'];
    }

    public function execute() 
    {
        $user = new User(
            $this->name,
            $this->surname,
            new Email($this->email),
            new Password($this->password)
        );

        $this->userRepositoryInterface->addUser($user);
    }
}