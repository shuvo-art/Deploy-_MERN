import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state.auth);
  const { user, isError, isSuccess, message } = authState;

  useEffect(() => {
    if (isSuccess && user.role === "admin") {
      console.log("Admin");
      navigate("/"); // Navigate to admin dashboard
    } else if (isSuccess && user.role === "volunteer") {
      navigate("/"); // Navigate to volunteer dashboard
      console.log("Volunteer");
    }
  }, [user, isSuccess, navigate]);

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        {isError && (
          <p className="text-danger text-center">
            {message || "Login failed!"}
          </p>
        )}
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            label="Email Address"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <CustomInput
            type="password"
            name="password"
            label="Password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Login
          </button>
        </form>
        <div className="mb-3 text-end">
          <Link to="/forget-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
