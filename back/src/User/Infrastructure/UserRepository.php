<?php

require_once 'Connection.php';
require_once __DIR__ . '/../Domain/UserRepositoryInterface.php';

class UserRepository implements UserRepositoryInterface
{
    private $connection;

    public function __construct()
    {
        $this->connection = new Connection();
    }

    public function addUser(User $user): void
    {
        try {
            $stmt = $this->connection->Connect()->prepare(
                "INSERT INTO User (name, surname, email, password) 
                  VALUES (:name, :surname, :email, :password)"
            );
            $stmt->bindValue(':name', $user->getName());
            $stmt->bindValue(':surname', $user->getSurname());
            $stmt->bindValue(':email', $user->getEmail());
            $stmt->bindValue(':password', $user->getPassword());
            $stmt->execute();
        } catch (PDOException $e) {
            if ($e->errorInfo[1] == 1062) {
                throw new Exception("This email already exists");
            } else {
                throw new Exception($e->getMessage());
            }
        }
    }

    public function getUserById(int $id): ?User
    {
        try {
            $stmt = $this->connection->Connect()->prepare("SELECT * FROM User WHERE id = :id");
            $stmt->bindValue(':id', $id);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                return new User(
                    $user['name'],
                    $user['surname'],
                    $user['email'],
                    $user['password']
                );
            }

            return null;
        } catch (PDOException $e) {
            throw new Exception($e->getMessage() . " | " . $e->getCode());
        }
    }

    public function getUserByEmail(Email $email): ?array
    {
        try {
            $stmt = $this->connection->Connect()->prepare("SELECT * FROM User WHERE email = :email");
            $stmt->bindValue(':email', $email->getEmail());
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                return $user;
            }

            return null;
        } catch (PDOException $e) {
            throw new Exception($e->getMessage() . " | " . $e->getCode());
        }
    }
}