const routes = {
  signup: '/signup',
  login: '/login',
  logout: '/logout',
  refresh: '/refresh'
} as const;

export type TAuthRoutes = (typeof routes)[keyof typeof routes];