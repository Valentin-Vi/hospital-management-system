import type { TAuthRoutes } from "./types";

const AUTH_URL = "http://localhost:3010/auth"

async function fetchAuth(route: TAuthRoutes, options: RequestInit): Promise<Response> {
  options.credentials = options.credentials || "include";
  options.mode = options.mode || "cors";
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json'
  }

  let response = await fetch(AUTH_URL + route, options)
  
  if(response.status === 401) {
    response = await fetch(AUTH_URL + '/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
  
    if(response.status !== 200) {
      response = await fetch(AUTH_URL + route, options);
    } else {
      throw new Error('Session expired.')
    }
  }
  return response;
}

export default fetchAuth;
