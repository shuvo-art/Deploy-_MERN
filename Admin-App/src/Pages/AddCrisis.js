import { React, useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createCrisis, resetState } from "../features/crisis/crisisSlice";
import { useNavigate } from "react-router-dom";

// Validation schema for the crisis form
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  severity: yup.string().required("Severity is required"),
  location: yup.string().required("Location is required"),
});

const AddCrisis = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newCrisis = useSelector((state) => state.crisis);
  const { isSuccess, isError, createdCrisis } = newCrisis;

  useEffect(() => {
    if (isSuccess && createdCrisis) {
      toast.success("Crisis added successfully!");
      dispatch(resetState());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createdCrisis, dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      severity: "",
      location: "",
      image: "", // Optional field for crisis images
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCrisis(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/list-crisis"); // Navigate to crisis list after success
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Crisis</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          {/* Crisis Title Input */}
          <CustomInput
            type="text"
            label="Enter Crisis Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          {/* Crisis Description Input */}
          <CustomInput
            type="text"
            label="Enter Crisis Description"
            name="description"
            onChng={formik.handleChange("description")}
            onBlr={formik.handleBlur("description")}
            val={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          {/* Crisis Severity Dropdown */}
          <select
            name="severity"
            className="form-control py-3 mb-3"
            onChange={formik.handleChange("severity")}
            onBlur={formik.handleBlur("severity")}
            value={formik.values.severity}
          >
            <option value="">Select Severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="error">
            {formik.touched.severity && formik.errors.severity}
          </div>

          {/* Crisis Location Input */}
          <CustomInput
            type="text"
            label="Enter Crisis Location"
            name="location"
            onChng={formik.handleChange("location")}
            onBlr={formik.handleBlur("location")}
            val={formik.values.location}
          />
          <div className="error">
            {formik.touched.location && formik.errors.location}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Add Crisis
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCrisis;
