import { RouterProvider } from 'react-router'
import { AppRouter } from '@router'
import { AuthProvider } from 'security/AuthProvider'
import { BackendProvider } from 'hooks/BackendProvider'
import useAuthRefresh from 'hooks/useAuthRefresh'

function App() {
  useAuthRefresh()

  return (
    <AuthProvider>
      <BackendProvider>
        <RouterProvider router={AppRouter} />
      </BackendProvider>
    </AuthProvider>
  )
}

export default App
