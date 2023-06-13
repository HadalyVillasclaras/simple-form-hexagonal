<?php

class AuthSignIn
{
    private $userRepository;
    private $email;
    private $password;

    public function __construct(array $userData, UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->email = $userData['email'];
        $this->password = $userData['password'];
    }

    public function execute(): string
    {
        $email = new Email($this->email);
        $password = $userData['password'] ?? '';
        $user = $this->userRepository->getUserByEmail($email);

        if (
          !$user || 
          !password_verify($password, $user['password'])
        ) {
            throw new InvalidCredentialsException;
          }

        $payload = [
            'user_id' => $user['id'],
            'email' => $user['email'],
        ];

        $jwt = JWT::encode($payload, 'your-secret-key', 'HS256');

        return $jwt;
    }
}