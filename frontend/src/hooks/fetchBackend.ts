import type { TBackendRoutes } from "./types/TBackendRoutes";

const BACKEND_URL = "http://localhost:3010/service"

async function fetchBackend(route: TBackendRoutes, options: RequestInit): Promise<Response> {
  let response = undefined;
  options.credentials = options.credentials || "include";
  options.mode = options.mode || "cors";
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json'
  }

  response = await fetch(BACKEND_URL + route, options)
  if(response.status === 401) {
    response = await fetch(BACKEND_URL + '/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    if(response.status !== 200) {
      response = await fetch(BACKEND_URL + route, options);
    } else {
      throw new Error('Session expired.')
    }
  }
  return response;
}

export default fetchBackend;
