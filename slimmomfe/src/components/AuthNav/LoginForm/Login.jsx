import { useState, useId} from 'react'
import Styles from './Login.module.css'
import {Formik, Form, Field} from 'formik';
const Register = () => {

  const emailFieldId= useId();
  const passwordFieldId = useId();

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

  const handleSubmit=(values,actions)=>{
    console.log(values);
    actions.resetForm();

    setValues({
      email:"",
      password:""
    })
  };

  return (
    <Formik initialValues={{ email:"",password:""}} className={Styles.loginPage} onSubmit={handleSubmit}>
        <h1 id="loginHeader" className={Styles.headerAuth}>LOGIN</h1>
        <Form className={Styles.formRegister} onChange={handleSubmit}>
          <Field name="email"  id={emailFieldId} type="text" value={values.email} placeholder='Email *' onChange={handleChangeInput} className={Styles.formInputElement}></Field>
          <Field name="password" id={passwordFieldId} type="password" value={values.password} placeholder='Password *' onChange={handleChangeInput} className={Styles.formInputElement}></Field>
          <div className={Styles.buttonAuth}>
          <button type="submit" className={Styles.buttonOne}>Register</button>
          <button type="submit" className={Styles.buttonOne}>Login</button>
          </div>
        </Form>
    </Formik>
  )
}

export default Register;