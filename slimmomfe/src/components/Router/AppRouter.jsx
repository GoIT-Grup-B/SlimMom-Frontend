import {  Routes, Route } from 'react-router-dom';
import { lazy } from "react";
const AppRouter = () => {

    const RegisterPage = lazy(()=>import('../../pages/Register.jsx'));
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route />
            <Route path='/register' element={<RegisterPage/>} />
            <Route />
            <Route />
            <Route />
        </Routes>
    </Suspense>
  )
}

export default AppRouter