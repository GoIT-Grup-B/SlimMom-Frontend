import { useState } from 'react'
import Styles from './Register.module.css'
import {Formik, Form, Field} from 'formik';
import {useId} from 'react';

const Register = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const [values,setValues] = useState({
    name:"",
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
      name:"",
      email:"",
      password:""
    })
  };

  return (
    <Formik className={Styles.registerPage} initialValues={{ name:"",email:"",password:""}} onSubmit={handleSubmit}>
        <h1 id="registerHeader" className={Styles.headerAuth}>REGISTER</h1>
        <Form className={Styles.formRegister} onChange={handleSubmit}>
          <Field name="name" id={nameFieldId} type="text" value={values.name} placeholder='Name *' onChange={handleChangeInput} className={Styles.formInputElement}></Field>
          <Field name="email" id={emailFieldId} type="text" value={values.email} placeholder='Email *' onChange={handleChangeInput} className={Styles.formInputElement}></Field>
          <Field password="password" id={passwordFieldId} type="password" value={values.password} placeholder='Password *' onChange={handleChangeInput} className={Styles.formInputElement}></Field>
          <div className={Styles.buttonAuth}>
          <button type="submit" className={Styles.buttonOne}>Register</button>
          <button type="submit" className={Styles.buttonOne}>Login</button>
          </div>

        </Form>
    </Formik>
  )
}

export default Register;