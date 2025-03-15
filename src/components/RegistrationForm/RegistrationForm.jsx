import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../redux/auth/authOps";

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
      const {name,email,password}=values;
      console.log(values);
      await dispatch(registerUser({name,email,password}));
      console.log(registerUser({name,email,password}));
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
      className=""
    >
            {({ handleChange }) => (
        <Form className="flex flex-col space-y-6  items-start">
          <h1 id="registerHeader" className="text-orange-500 font-bold">
            REGISTER
          </h1>
          <div>
          <Field
            name="name"
            id={nameFieldId}
            type="text"
            placeholder="Name *"
            className="w-100 p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            onChange={handleChange}
          />
          <ErrorMessage name="name" component="div" className="" />
          </div>

          <div>
          <Field
            name="email"
            id={emailFieldId}
            type="email"
            placeholder="Email *"
            className="w-100 p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            onChange={handleChange}
          />
          <ErrorMessage name="email" component="div" className="" />
          </div>

          <div>
          <Field
            name="password"
            id={passwordFieldId}
            type="password"
            placeholder="Password *"
            className="w-100 p-2 border-b border-gray-300 focus:outline-none focus:ring-0"
            onChange={handleChange}
          />
          <ErrorMessage
            name="password"
            component="div"
            className=""
          />
          </div>

          <div className="">
            <button
              type="submit"
              className="bg-[#FC842D] text-white px-14 py-2 rounded-full hover:bg-orange-600 mr-10"
            >
              Register
            </button>
            <button
              type="button"
              className="bg-white text-[#FC842D] px-14 py-2 rounded-full hover:bg-orange-600 border-orange-500 border-2"
              onClick={() => navigate("/auth/login")}
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
