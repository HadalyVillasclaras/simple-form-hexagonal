import SignInService from "./Application/SignInService";
import SignUpService from "./Application/SignUpService";
import UserRepository from "./Infrastructure/UserRepository";

export class AppAdapter {
  private signUpService: SignUpService;
  private signInService: SignInService;

  constructor() {
    const userRepository = new UserRepository();
    this.signUpService = new SignUpService(userRepository);
    this.signInService = new SignInService(userRepository);
  }

  async handleSignUp(formData: FormData): Promise<any> {
    const response = await this.signUpService.signUp(formData);
    return response;
  }

  async handleSignIn(formData: FormData): Promise<any> {
    const response = await this.signInService.signIn(formData);
    return response;
  }
}
