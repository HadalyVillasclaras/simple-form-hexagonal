<?php
class AuthController {
  private $authenticationService;

  public function __construct(AuthenticationService $authenticationService) {
      $this->authenticationService = $authenticationService;
  }

  public function handleAuthenticationRequest() {
      try {
          $userData = json_decode(file_get_contents('php://input'), true);
          $email = $userData['email'] ?? '';
          $password = $userData['password'] ?? '';

          foreach ($userData as $data) {
            if (empty($data)) {
              throw new EmptyFieldException();
            }
          }

          $token = $this->authenticationService->authenticateUser($email, $password);

          echo json_encode(['token' => $token]);
      } catch (EmptyFieldException $e) {
          http_response_code(400);
          echo json_encode(['error' => $e->getMessage()]);
      } catch (Exception $e) {
          http_response_code(500);
          echo json_encode(['error' => $e->getMessage()]);
      }
  }
}
