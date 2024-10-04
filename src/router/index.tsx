import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "@/router/ProtectedRoute";
import PublicRoute from "@/router/PublicRoute";
import ErrorBoundaryWrapper from "@/components/Helper/ErrorBoundaryWrapper";
const Login = lazy(() => import("@/pages/login"));
const Register = lazy(() => import("@/pages/register"));
const Layout = lazy(() => import("@/pages/layout"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Customers = lazy(() => import("@/pages/customers"));
const Overview = lazy(() => import("@/pages/overview"));
const Daily = lazy(() => import("@/pages/daily"));
const Monthly = lazy(() => import("@/pages/monthly"));
const Breakdown = lazy(() => import("@/pages/breakdown"));
const Admin = lazy(() => import("@/pages/admin"));
const ErrorLog = lazy(() => import("@/pages/errorlog"));
const NotFound = lazy(() => import("@/pages/invalidpage/404"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    element: (
      <ErrorBoundaryWrapper>
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </ErrorBoundaryWrapper>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/customers",
        element: (
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        ),
      },
      {
        path: "/overview",
        element: (
          <ProtectedRoute>
            <Overview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/daily",
        element: (
          <ProtectedRoute>
            <Daily />
          </ProtectedRoute>
        ),
      },
      {
        path: "/monthly",
        element: (
          <ProtectedRoute>
            <Monthly />
          </ProtectedRoute>
        ),
      },
      {
        path: "/breakdown",
        element: (
          <ProtectedRoute>
            <Breakdown />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/errorlog",
        element: (
          <ProtectedRoute>
            <ErrorLog />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
