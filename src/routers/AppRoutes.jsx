import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import CalculatorPage from '../pages/CalculatorPage/CalculatorPage';
import DiaryPage from '../pages/DiaryPage/DiaryPage';

const RegistrationPage = lazy(
  () => import('../pages/RegistrationPage/RegistrationPage'),
);
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => {
    console.log('isLoggedIn:', state.auth.isLoggedIn);
    return state.auth.isLoggedIn;
  });
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => {
    console.log('isLoggedIn:', state.auth.isLoggedIn);
    return state.auth.isLoggedIn;
  });

  return isLoggedIn ? <Navigate to="/diary" replace /> : children;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* <Route path="/" element={<CalculatorPage />} /> */}
        <Route
          path="/auth/register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/diary"
          element={
            <PrivateRoute>
              <DiaryPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
