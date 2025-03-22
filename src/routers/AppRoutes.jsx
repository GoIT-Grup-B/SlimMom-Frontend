import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';

const RegistrationPage = lazy(
  () => import('../pages/RegistrationPage/RegistrationPage'),
);
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);
  return token ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);
  return token ? <Navigate to="/" replace /> : children;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/auth/register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
