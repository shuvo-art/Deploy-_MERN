import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createRelief, resetState } from "../features/relief/reliefSlice";
import { useNavigate } from "react-router-dom";

// Validation schema for relief form
let schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  quantity: yup.number().required("Quantity is required").positive(),
});

const AddRelief = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newRelief = useSelector((state) => state.relief);
  const { isSuccess, isError, createdRelief } = newRelief;

  useEffect(() => {
    if (isSuccess && createdRelief) {
      toast.success("Relief item added successfully!");
      dispatch(resetState());
      navigate("/relief-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, createdRelief, dispatch, navigate]);

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createRelief(values));
      formik.resetForm();
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Relief Item</h3>
      <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
        <CustomInput
          type="text"
          label="Enter Relief Item Name"
          name="name"
          onChng={formik.handleChange("name")}
          onBlr={formik.handleBlur("name")}
          val={formik.values.name}
        />
        <div className="error">{formik.touched.name && formik.errors.name}</div>

        <CustomInput
          type="number"
          label="Enter Relief Item Quantity"
          name="quantity"
          onChng={formik.handleChange("quantity")}
          onBlr={formik.handleBlur("quantity")}
          val={formik.values.quantity}
        />
        <div className="error">
          {formik.touched.quantity && formik.errors.quantity}
        </div>

        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 my-5"
        >
          Add Relief Item
        </button>
      </form>
    </div>
  );
};

export default AddRelief;
