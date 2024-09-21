import { React, useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createExpense, resetState } from "../features/expense/expenseSlice";
import { useNavigate } from "react-router-dom";

// Validation schema for expense form
let schema = yup.object().shape({
  amount: yup.number().required("Amount is required").positive(),
  details: yup.string().required("Expense details are required"),
});

const AddExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newExpense = useSelector((state) => state.expense);
  const { isSuccess, isError, isLoading, createdExpense } = newExpense;

  useEffect(() => {
    if (isSuccess && createdExpense) {
      toast.success("Expense added successfully!");
      dispatch(resetState());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading, createdExpense, dispatch]);

  const formik = useFormik({
    initialValues: {
      amount: "",
      details: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createExpense(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/expenses");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Expense</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="number"
            label="Enter Expense Amount"
            name="amount"
            onChng={formik.handleChange("amount")}
            onBlr={formik.handleBlur("amount")}
            val={formik.values.amount}
          />
          <div className="error">
            {formik.touched.amount && formik.errors.amount}
          </div>

          <CustomInput
            type="text"
            label="Enter Expense Details"
            name="details"
            onChng={formik.handleChange("details")}
            onBlr={formik.handleBlur("details")}
            val={formik.values.details}
          />
          <div className="error">
            {formik.touched.details && formik.errors.details}
          </div>

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
