<<<<<<< HEAD:src/components/AuthNav/LoginForm/LoginForm.jsx
import { useState, useId} from 'react'
import Styles from './Login.module.css'
import {Formik, Form, Field} from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/auth/slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const emailFieldId= useId();
  const passwordFieldId = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values,setValues] = useState({
    email:"",
    password:"",
  });

  const handleChangeInput=(event)=>{
    setValues({
      ...values,
      [event.target.name]:event.target.value,
    })
  };

  const handleSubmit = async(values,{resetForm})=>{
    const {email, password}=values;
    try{
      
      await dispatch(loginUser( {email, password}));
      toast.success("Login is successful.")
    }catch (error) {
      console.error("Login failed:", error); // Log detailed error
     toast.error('Login failed! Please check your credentials and try again.'); // User-friendly error message
    }
    
    resetForm();
    setValues({
      email:"",
      password:""
    })
  };

  const loginSchema = Yup.object().shape({
    email:Yup.string().email("Must be a valid email!").required("Required"),
    password:Yup.string().min(2,"to short").max(50,"to long").required("Required"),
  });

  return (
    <Formik initialValues={{ email:"",password:""}} className={Styles.loginPage} onSubmit={handleSubmit} validationSchema={loginSchema}>
        <>
        <h1 id="loginHeader" className={Styles.headerAuth}>LOGIN</h1>
        <Form className={Styles.formLogin} onChange={handleSubmit}>
          <Field name="email"  id={emailFieldId} type="text" value={values.email} placeholder='Email *' onChange={handleChangeInput} className={Styles.formInputElement}></Field>
          <Field name="password" id={passwordFieldId} type="password" value={values.password} placeholder='Password *' onChange={handleChangeInput} className={Styles.formInputElement}></Field>
          <div className={Styles.buttonAuth}>
          <button type="submit" className={Styles.buttonOne}>Login</button>
          <button type="submit" className={Styles.buttonTwo} onClick={()=>navigate('/auth/register')}>Register</button>
          </div>
        </Form>
        </>
    </Formik>
  )
}

export default LoginForm;
=======
import { useId } from "react";
import Styles from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/authOps";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log("Form gönderiliyor:", values); // Test için log ekledik

    try {
      const result = await dispatch(loginUser(values)).unwrap();
      console.log("Redux login sonucu:", result);
      toast.success("Login is successful.");
      resetForm();
    } catch (error) {
      toast.error(`Login failed: ${error.message || "Unknown error"}`);
    } finally {
      setSubmitting(false);
    }
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email!").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Too long")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className={Styles.container}>
          <h1 id="loginHeader" className={Styles.headerAuth}>
            LOGIN
          </h1>
          <Form className={Styles.formRegister}>
            {/* Email Input */}
            <div className={Styles.inputWrapper}>
              <Field
                name="email"
                id={emailFieldId}
                type="email"
                placeholder="Email *"
                className={Styles.formInputElement}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={Styles.errorMessage}
              />
            </div>

            {/* Password Input */}
            <div className={Styles.inputWrapper}>
              <Field
                name="password"
                id={passwordFieldId}
                type="password"
                placeholder="Password *"
                className={Styles.formInputElement}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={Styles.errorMessage}
              />
            </div>

            {/* Butonlar */}
            <div className={Styles.buttonAuth}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#FC842D] text-white px-14 py-2 rounded-full hover:bg-orange-600 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <button
                type="button"
                className="bg-white text-[#FC842D] px-14 py-2 rounded-full hover:bg-orange-600 border-orange-500 border-2"
              >
                Register
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
>>>>>>> 73b8a7dab035199338ecd082784542e4a07d90c6:src/components/LoginForm/LoginForm.jsx
