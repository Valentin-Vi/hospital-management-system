const backendRoutes = {
  'get-medication': '/get-medications'
} as const;

type TBackendRoutes = (typeof backendRoutes)[keyof typeof backendRoutes]

export type { TBackendRoutes }
