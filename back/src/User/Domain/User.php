<?php
require_once __DIR__ . '/ValueObjects/Email.php';
require_once __DIR__ . '/ValueObjects/Password.php';

class User {
    private string $name;
    private string $surname;
    private Email $email;
    private Password $password;

    public function __construct(string $name, string $surname, Email $email, Password $password) 
    {
        $this->name = $name;
        $this->surname = $surname;
        $this->email = $email;
        $this->password = $password;
    }

    public function getName(): string 
    {
        return $this->name;
    }

    public function setName(string $name): void 
    {
        $this->name = $name;
    }

    public function getSurname(): string {
        return $this->surname;
    }

    public function setSurname(string $surname): void 
    {
        $this->surname = $surname;
    }

    public function getEmail(): string 
    {
        return $this->email->value();
    }

    public function setEmail(Email $email): void 
    {
        $this->email = $email;
    }

    public function getPassword(): string 
    {
        return $this->password->value();
    }

    public function setPassword(Password $password): void 
    {
        $this->password = $password;
    }
}