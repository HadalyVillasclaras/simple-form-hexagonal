<?php
class InvalidCredentialsException extends Exception {
  public function __construct($message = "Invalid credentials.", $code = 0) {
      parent::__construct($message, $code);
  }
}
