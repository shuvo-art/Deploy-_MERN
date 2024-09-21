import { React, useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createDonation, resetState } from "../features/donation/donationSlice";
import { useNavigate } from "react-router-dom";

// Validation schema for donation form
let schema = yup.object().shape({
  donor: yup.string().required("Donor name is required"),
  amount: yup.number().required("Amount is required").positive(),
});

const AddDonation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newDonation = useSelector((state) => state.donation);
  const { isSuccess, isError, isLoading, createdDonation } = newDonation;

  useEffect(() => {
    if (isSuccess && createdDonation) {
      toast.success("Donation added successfully!");
      dispatch(resetState());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading, createdDonation, dispatch]);

  const formik = useFormik({
    initialValues: {
      donor: "",
      amount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createDonation(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/chart-donation");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Donation</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Donor Name"
            name="donor"
            onChng={formik.handleChange("donor")}
            onBlr={formik.handleBlur("donor")}
            val={formik.values.donor}
          />
          <div className="error">
            {formik.touched.donor && formik.errors.donor}
          </div>

          <CustomInput
            type="number"
            label="Enter Donation Amount"
            name="amount"
            onChng={formik.handleChange("amount")}
            onBlr={formik.handleBlur("amount")}
            val={formik.values.amount}
          />
          <div className="error">
            {formik.touched.amount && formik.errors.amount}
          </div>

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Add Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDonation;
