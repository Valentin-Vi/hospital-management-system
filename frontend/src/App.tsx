import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import { AppRouter } from '@router'
import { AuthProvider } from 'security/AuthProvider'
import { BackendProvider } from 'hooks/BackendProvider'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BackendProvider>
          <RouterProvider router={AppRouter} />
        </BackendProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
