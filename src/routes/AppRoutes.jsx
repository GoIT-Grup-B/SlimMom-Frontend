import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RegistrationPage = lazy(() =>
  import("../pages/RegistirationPage/RegistirationPage")
);
const LoginForm = lazy(() => import("../pages/LoginPage/LoginPage"));
const DiaryPage = lazy(() => import("../pages/DiaryPage/DiaryPage"));
const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const CalculatorPage = lazy(() =>
  import("../pages/CalculatorPage/CalculatorPage")
);

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token); // state.auth.token
  if (token === null) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token); // state.auth.token
  if (token === null) {
    return children;
  }
  return <Navigate to="/diary" replace />;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/register"
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
              <LoginForm />
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
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DiaryPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
