import * as data from './jsonDB.json'; 

export default class JsonMockUserRepository {

  async signIn(user: any): Promise<Response> {
    try {
      const storedUser = data?.default[0];
    
      if (user.email === storedUser.mail && user.password === storedUser.pass) {
        
        return {
          status: 'success',
          message: '✫ Logged in successfully ✫'
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

}


