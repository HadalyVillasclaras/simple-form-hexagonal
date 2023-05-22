<?php


require_once 'Connection.php';
require_once __DIR__ . '/../Domain/UserRepositoryInterface.php';

class UserRepository implements UserRepositoryInterface {
    private $connection;

    public function __construct() {
        $this->connection = new Connection();
    }

    public function addUser(User $user): void {
        try {
            $stmt = $this->connection->Connect()->prepare(
                "INSERT INTO User (name, first_surname, second_surname, email, password) 
                  VALUES (:name, :first_surname, :second_surname, :email, :password)"
            );
            $stmt->bindValue(':name', $user->getName());
            $stmt->bindValue(':first_surname', $user->getFirstSurname());
            $stmt->bindValue(':second_surname', $user->getSecondSurname());
            $stmt->bindValue(':email', $user->getEmail());
            $stmt->bindValue(':password', $user->getPassword());
            $stmt->execute();
        } catch (PDOException $e) {
            if ($e->errorInfo[1] == 1062) {
                throw new Exception("Email already exists.");
            } else {
                throw new Exception("Error: " . $e->getMessage());
            }
        }
    }
}
