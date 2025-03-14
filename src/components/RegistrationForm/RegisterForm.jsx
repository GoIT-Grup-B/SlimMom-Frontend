import { useState } from "react";
import Styles from "./RegisterForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../redux/auth/slice";

const Register = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChangeInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { name, email, password } = values;
    try {
      await dispatch(registerUser({ name, email, password }));
      toast.success("Registration is successful.");
      resetForm();
      navigate("/login");
    } catch (error) {
      if (error.code === 11000) {
        toast.error("User already exists. Please try a different email.");
      } else {
        toast.error("Registration failed, please try again.");
      }
      resetForm();
    }

    setValues({
      name: "",
      email: "",
      password: "",
    });
  };

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
      .required("E-mail is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  return (
    <Formik
      className={Styles.registerPage}
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
    >
      <>
        <h1 id="registerHeader" className={Styles.headerAuth}>
          REGISTER
        </h1>
        <Form className={Styles.formRegister} onChange={handleSubmit}>
          <Field
            name="name"
            id={nameFieldId}
            type="text"
            value={values.name}
            placeholder="Name *"
            onChange={handleChangeInput}
            className={Styles.formInputElement}
          ></Field>
          <ErrorMessage name="name" component="span" />
          <Field
            name="email"
            id={emailFieldId}
            type="text"
            value={values.email}
            placeholder="Email *"
            onChange={handleChangeInput}
            className={Styles.formInputElement}
          ></Field>
          <ErrorMessage name="email" component="span" />
          <Field
            password="password"
            id={passwordFieldId}
            type="password"
            value={values.password}
            placeholder="Password *"
            onChange={handleChangeInput}
            className={Styles.formInputElement}
          ></Field>
          <ErrorMessage name="password" component="span" />
          <div className={Styles.buttonAuth}>
            <button
              type="submit"
              className="bg-[#FC842D] text-white px-14 py-2 rounded-full hover:bg-orange-600"
            >
              Register
            </button>
            <button
              type="submit"
              className="bg-[#FC842D] text-white px-14 py-2 rounded-full hover:bg-orange-600"
            >
              Login
            </button>
          </div>
        </Form>
      </>
    </Formik>
  );
};

export default Register;
