<?php
require_once __DIR__ . '/User.php';

interface UserRepositoryInterface
{
	public function addUser(User $user): void;
	public function getUserById(int $id): ?User;
	public function getUserByEmail(Email $email): ?array;
}
