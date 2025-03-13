import {  Routes, Route } from 'react-router-dom';
import { lazy } from "react";
import RestrictadRoute from './RestrictedRoute.jsx';
const AppRouter = () => {

    const RegisterPage = lazy(()=>import('../../pages/Register.jsx'));
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route />
            <Route path='/auth/register' element={<RestrictadRoute> <RegisterPage/> </RestrictadRoute>} />
            <Route />
            <Route />
            <Route />
        </Routes>
    </Suspense>
  )
}

export default AppRouter