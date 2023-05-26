import SignInService from "./Application/SignInService";
import SignUpService from "./Application/SignUpService";
import UserRepository from "./Infrastructure/UserRepository";

export interface InputResponse {
  status: string,
  errors: Array<{ field: 'string', message: string }>,
}

export interface AppResponse {
  status: string,
  message: string,
  data?: string
}

export class AppAdapter {
  private signUpService: SignUpService;
  private signInService: SignInService;

  constructor() {
    const userRepository = new UserRepository();
    this.signUpService = new SignUpService(userRepository);
    this.signInService = new SignInService(userRepository);
  }

  async handleSignUp(formData: FormData): Promise<any> {
    try {
      const serviceResponse = await this.signUpService.signUp(formData);
      if (serviceResponse instanceof Response) {
        const responseData = await serviceResponse.json();
        return responseData;
      } 
      return serviceResponse;
    } catch (error) {
      throw { status: 'error', message: error.message };
    }
  }


  async handleSignIn(formData: FormData): Promise<any> {
    try {
      const serviceResponse = await this.signInService.signIn(formData);
      if (serviceResponse instanceof Response) {
        const responseData = await serviceResponse.json();
        return responseData;
      } 
      return serviceResponse;
    } catch (error) {
      throw { status: 'error', message: error.message };
    }
  }
}
