import { useState } from 'react'
import Styles from './Register.module.css'

const Register = () => {

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

  const handleSubmit=(event)=>{
    event.preventDefault();

    setValues({
      email:"",
      password:""
    })
  };

  return (
    <div className={Styles.loginPage}>
        <h1 id="loginHeader" className={Styles.headerAuth}>LOGIN</h1>
        <form className={Styles.formRegister} onChange={handleSubmit}>
          <input email="email" type="text" value={values.email} placeholder='Email *' onChange={handleChangeInput} className={Styles.formInputElement}></input>
          <input password="password" type="password" value={values.password} placeholder='Password *' onChange={handleChangeInput} className={Styles.formInputElement}></input>
          <div className={Styles.buttonAuth}>
          <button type="submit" className={Styles.buttonOne}>Register</button>
          <button type="submit" className={Styles.buttonOne}>Login</button>
          </div>
        </form>
    </div>
  )
}

export default Register;