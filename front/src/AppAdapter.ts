import SignInService from "./Application/SignInService";
import SignUpService from "./Application/SignUpService";
import UserRepositoryJson from "./Infrastructure/JsonMockUserRepository";
import UserRepository from "./Infrastructure/MysqlUserRepository";

export interface InputResponse {
  status: string,
  inputErrors: Array<{ field: 'string', message: string }>,
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
    const jsonUserRepository = new UserRepositoryJson();
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
      if (error instanceof Error)
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
      if (error instanceof Error) 
      throw { status: 'error', message: error.message };
    }
  }
}