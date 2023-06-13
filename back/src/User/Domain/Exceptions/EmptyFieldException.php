<?php
class EmptyFieldException extends Exception {
  public function __construct($field = "", $message = "", $code = 0) {
      if(empty($message)) {
          $message = "Field {$field} cannot be empty.";
      }
      parent::__construct($message, $code);
  }
}