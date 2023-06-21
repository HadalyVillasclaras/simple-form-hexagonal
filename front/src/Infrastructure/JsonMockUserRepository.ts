import * as data from './jsonDB.json'; 
import { User } from '../Domain/User';

export default class JsonMockUserRepository {

  async signIn(user: User): Promise<Response> {
    try {
      const storedUser = data?.default[0];
    
      if (user.email === storedUser.mail && user.password === storedUser.pass) {
        
        return {
          status: 'success',
          message: 'Logged in successfully'
        };
      } else {
        return {
          status: 'error',
          message: 'Invalid credentials'
        };
      }
    } catch (error) {
      throw { status: 'error', message: error.message};
    }
  }

  async addUser(user: User): Promise<Response> {
    try {
      if (user) {
        return {
          status: 'success',
          message: 'Logged up successfully'
        };
      }
    } catch (error) {
      throw { status: 'error', message: error.message};
    }
  }
}