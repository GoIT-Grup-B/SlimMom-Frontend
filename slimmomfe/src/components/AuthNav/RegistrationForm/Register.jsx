import { useState } from 'react'
import Styles from './Register.module.css'

const Register = () => {

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

  const handleSubmit=(event)=>{
    event.preventDefault();

    setValues({
      name:"",
      email:"",
      password:""
    })
  };

  return (
    <div>
        <h1 id="registerHeader" className={Styles.headerAuth}>REGISTER</h1>
        <form onChange={handleSubmit}>
          <input name="name" type="text" value={values.name} onChange={handleChangeInput}></input>
          <input email="email" type="text" value={values.email} onChange={handleChangeInput}></input>
          <input password="password" type="password" value={values.password} onChange={handleChangeInput}></input>
          <button type="submit"></button>
        </form>
    </div>
  )
}

export default Register;