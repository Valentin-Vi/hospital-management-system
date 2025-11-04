import { createBrowserRouter, Navigate } from "react-router";
import ProtectedRoute from "security/ProtectedRoute";
import LoginPage from "pages/LoginPage/LoginPage";
import Layout from "@components/composition/Layout";
import ErrorPage from "pages/ErrorPage/ErrorPage";
import MedicationPage from "pages/MedicationPage/MedicationPage";
import { Button } from "@components/ui/button";
import { FaLeaf } from "react-icons/fa6";

export default createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/auth/login'/>
  }, {
    path: '/test',
    element: <Button displayText="Hello" shape={'chip'} variant={'red'} onClick={() => null} Icon={FaLeaf} />
  }, {
    path: '/auth',
    element: <ProtectedRoute authorizedRoles={['VISITOR']} />,
    errorElement: <Navigate to='/error' />,
    children: [
      {
        path: '/auth/login',
        element: <Layout />,
        children: [
          {
            path: '/auth/login',
            element: <LoginPage />
          }
        ]
      }
    ]
  }, {
    path: '/services',
    element: <ProtectedRoute authorizedRoles={['ADMIN']} />,
    children: [
      {
        path: '/services',
        element: <Layout />,
        children: [
          {
            path: '/services/medication',
            element: <MedicationPage />,
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
        element: <ErrorPage />
      }, {
        path: '/error/unauthorized',
        element: <ErrorPage />
      }
    ]
  }
]);
