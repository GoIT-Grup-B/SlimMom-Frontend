import { useState, useId} from 'react'
import Styles from './Login.module.css'
import {Formik, Form, Field} from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/auth/slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const emailFieldId= useId();
  const passwordFieldId = useId();
  const dispatch = useDispatch();
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
        <Form className={Styles.formRegister} onChange={handleSubmit}>
          <Field name="email"  id={emailFieldId} type="text" value={values.email} placeholder='Email *' onChange={handleChangeInput} className={Styles.formInputElement}></Field>
          <Field name="password" id={passwordFieldId} type="password" value={values.password} placeholder='Password *' onChange={handleChangeInput} className={Styles.formInputElement}></Field>
          <div className={Styles.buttonAuth}>
          <button type="submit" className={Styles.buttonOne}>Register</button>
          <button type="submit" className={Styles.buttonOne}>Login</button>
          </div>
        </Form>
        </>
    </Formik>
  )
}

export default Register;