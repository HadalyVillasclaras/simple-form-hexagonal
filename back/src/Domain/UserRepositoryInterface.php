<?php

require_once __DIR__ . '/User.php';

interface UserRepositoryInterface
{
  public function addUser(User $user): void;
}
