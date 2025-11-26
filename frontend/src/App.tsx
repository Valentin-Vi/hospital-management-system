import { RouterProvider } from 'react-router'
import AppRouter from '@/router/AppRouter'
import { AuthProvider } from '@/security/AuthProvider'
import { BackendProvider } from '@/components/hooks/BackendProvider'

function App() {
  return (
    <AuthProvider>
      <BackendProvider>
        <RouterProvider router={AppRouter} />
      </BackendProvider>
    </AuthProvider>
  )
}

export default App
