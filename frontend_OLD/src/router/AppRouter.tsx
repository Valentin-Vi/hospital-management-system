import { createBrowserRouter, Navigate } from 'react-router';
import ProtectedRoute from '../security/ProtectedRoute';
import ErrorPage from '../pages/ErrorPages/ErrorPage';
import Layout from '../composition/Layout';
import LoginPage from '../pages/LoginPage/LoginPage';

export default createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute authorizedRoles={['VISITOR']}/>,
    errorElement: <Navigate to="/error" />,
    children: [
      {
        path: '/login',
        element: <Layout />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          }
        ]
      }
    ]
  }, {
    path: '/error',
    element: <Layout />,
    children: [
      {
        path: '/error',
        element: <ErrorPage />,
      }
    ]
  }
]);
