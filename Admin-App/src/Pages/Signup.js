import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";

let schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9-]+$/, "Phone number is not valid"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Role is required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "volunteer",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [user, isLoading, isError, isSuccess]);

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center title">Signup</h3>
        <p className="text-center">Create your account to continue.</p>
        <div className="error text-center">
          {isError && <p>{message || "Something went wrong!"}</p>}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="name"
            label="Name"
            id="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error mt-2">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="text"
            name="email"
            label="Email Address"
            id="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="text"
            name="phone"
            label="Phone Number"
            id="phone"
            onChng={formik.handleChange("phone")}
            onBlr={formik.handleBlur("phone")}
            val={formik.values.phone}
          />
          <div className="error mt-2">
            {formik.touched.phone && formik.errors.phone}
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Password"
            id="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mt-3">
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              name="role"
              onChange={formik.handleChange("role")}
              onBlur={formik.handleBlur("role")}
              value={formik.values.role}
              className="form-control"
            >
              <option value="volunteer">Volunteer</option>
              <option value="admin" disabled>Admin</option>
            </select>
            <div className="error mt-2">
              {formik.touched.role && formik.errors.role}
            </div>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5 mt-3"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
