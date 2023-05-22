<?php

class User {
    private string $name;
    private string $firstSurname;
    private string $secondSurname;
    private string $email;
    private string $password;

    public function __construct(string $name, string $firstSurname, string $secondSurname, string $email, string $password) {
        $this->name = $name;
        $this->firstSurname = $firstSurname;
        $this->secondSurname = $secondSurname;
        $this->email = $email;
        $this->password = $password;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name): void {
        $this->name = $name;
    }

    public function getFirstSurname(): string {
        return $this->firstSurname;
    }

    public function setFirstSurname(string $firstSurname): void {
        $this->firstSurname = $firstSurname;
    }

    public function getSecondSurname(): string {
        return $this->secondSurname;
    }

    public function setSecondSurname(string $secondSurname): void {
        $this->secondSurname = $secondSurname;
    }

    public function getEmail(): string {
        return $this->email;
    }

    public function setEmail(string $email): void {
        $this->email = $email;
    }

    public function getPassword(): string {
        return $this->password;
    }

    public function setPassword(string $password): void {
        $this->password = $password;
    }
}
