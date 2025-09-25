import { RouterProvider } from 'react-router'
import { AppRouter } from '@router'
import { AuthProvider } from 'security/AuthProvider'
import { BackendProvider } from 'hooks/BackendProvider'

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
