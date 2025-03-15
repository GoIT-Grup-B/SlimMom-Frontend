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
