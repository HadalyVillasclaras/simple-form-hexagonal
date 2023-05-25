export interface SignInErrorInterface {
  status: string;
  message: string;
  field: 'email' | 'password';
}

export class SignInError extends Error implements SignInErrorInterface{
  status: string;
  field: 'email' | 'password';

  constructor(message: string, field: 'email' | 'password') {
    super(message);
    this.name = 'SignInError';
    this.status = 'error';
    this.field = field;
  }
}