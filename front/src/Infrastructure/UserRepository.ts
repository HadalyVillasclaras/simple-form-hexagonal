import { API_BASE_URL } from '../../config';
import { User } from '../Domain/User';

export default class UserRepository {

  async addUser(user: User): Promise<Response> {
    try {
      const response = await fetch(API_BASE_URL + 'SignUpController.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      return response;

    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async signIn(user: User): Promise<Response> {
    try {
      const response = await fetch(API_BASE_URL + 'SignInController.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
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
