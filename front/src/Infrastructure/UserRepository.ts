import { API_BASE_URL } from '../../config';

export default class UserRepository {

  async addUser(userData: FormData): Promise<Response> {
    try {
      const response = await fetch(API_BASE_URL + 'SignUpController.php', {
        method: 'POST',
        body: userData
      });
     
      return response;

    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async getUserByEmail(): Promise<Response> {
    try {
      const response = await fetch(API_BASE_URL + 'SignInController.php', {
        method: 'GET'
      });

      return response;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}
