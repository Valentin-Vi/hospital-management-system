import { createBrowserRouter, Navigate } from "react-router";
import ProtectedRoute from "security/ProtectedRoute";
import { LoginPage, ErrorPage, MedicalReport, MedicationPage } from "@pages";
import Layout from "@components/composition/Layout";
import { SearchField } from "@components/ui/search-field";

export default createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/auth/login'/>,
    errorElement: <Navigate to='/error' />
  }, {
    path: '/test',
    element: <SearchField variant="white_bordered"/>
  } ,{
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
    path: '/report',
    element: <ProtectedRoute authorizedRoles={['ADMIN']} />,
    children: [
      {
        path: '/report',
        element: <Layout />,
        children: [
          {
            path: '/report/medical',
            element: <MedicalReport />
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
