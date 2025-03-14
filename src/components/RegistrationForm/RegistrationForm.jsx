import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../redux/auth/authOps";
import Styles from "./RegisterForm.module.css";

const Register = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(registerUser(values));
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
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange }) => (
        <Form className={Styles.formRegister}>
          <h1 id="registerHeader" className={Styles.headerAuth}>
            REGISTER
          </h1>

          <Field
            name="name"
            id={nameFieldId}
            type="text"
            placeholder="Name *"
            className={Styles.formInputElement}
            onChange={handleChange}
          />
          <ErrorMessage name="name" component="div" className={Styles.error} />

          <Field
            name="email"
            id={emailFieldId}
            type="email"
            placeholder="Email *"
            className={Styles.formInputElement}
            onChange={handleChange}
          />
          <ErrorMessage name="email" component="div" className={Styles.error} />

          <Field
            name="password"
            id={passwordFieldId}
            type="password"
            placeholder="Password *"
            className={Styles.formInputElement}
            onChange={handleChange}
          />
          <ErrorMessage
            name="password"
            component="div"
            className={Styles.error}
          />

          <div className={Styles.buttonAuth}>
            <button
              type="submit"
              className="bg-[#FC842D] text-white px-14 py-2 rounded-full hover:bg-orange-600"
            >
              Register
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-14 py-2 rounded-full hover:bg-gray-700"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
