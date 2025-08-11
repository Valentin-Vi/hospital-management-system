import type { User } from "../models/User";


export default class AuthService {
    
  #AUTH_API: string = "http://localhost:3000";

  constructor() {

  };

  async api(route: string, options: RequestInit): Promise<Response> {
    options.credentials = options.credentials || 'include';
    options.mode = options.mode || 'cors';

    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json'
    };

    let res = await fetch(this.#AUTH_API + route, options);
    if(res.status === 401) {
      console.log('Client access token has expired. Attempting refresh...');

      res = await fetch(this.#AUTH_API + '/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if(res.status !== 200) {
        res = await fetch(this.#AUTH_API + route, options);
      } else {
        console.log('Client refresh token is expired or invalid. Login is required...');
        throw new Error('Session expired.');
      };
    };
    
    return res;
  }

  async signup({ email, password, name, lastname }: { email: string, password: string, name: string, lastname: string }): Promise<true | false> {
    const res = await this.api('/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        name,
        lastname
      })
    });
    return res.ok ? true : false;
  };

  async login({ email, password }: { email: string, password: string }): Promise<User | false> {
    const res = await this.api('/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    });
    if (res.ok) {
      return await res.json() as User;
    } else {
      return false;
    };
  };

  async refresh(): Promise<User | null> {
    const res: Response = await this.api('/refresh', {
      method: 'POST'
    });
    if(res.ok) {
      return await res.json() as User;
    } else {
      return null;
    };
  };

  async logout(): Promise<true | false> {
    const res = await this.api('/logout', { method: 'POST' });
    return res.ok ? true : false;
  };
}
