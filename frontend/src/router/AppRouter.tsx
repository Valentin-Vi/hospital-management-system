import { createBrowserRouter, Navigate } from "react-router";
import ProtectedRoute from "@/security/ProtectedRoute";
import { LoginPage, ErrorPage, InventoryDashboard, MedicationPage, VisitRequestPage } from "@/pages";
import Layout from "@/components/composition/Layout";

export default createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/auth/login'/>,
    errorElement: <Navigate to='/error' />
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
            path: '/services/medications',
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
            path: '/report/inventory',
            element: <InventoryDashboard />
          }
        ]
      }
    ]
  }, {
    path: '/visit',
    element: <ProtectedRoute authorizedRoles={['CLIENT', 'ADMIN']} />,
    children: [
      {
        path: '/visit',
        element: <Layout />,
        children: [
          {
            path: '/visit/request',
            element: <VisitRequestPage />
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
