import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import homeReducer from "../features/home/homeSlice";
import uploadReducer from "../features/upload/uploadSlice";
import volunteerReducer from "../features/volunteers/volunteerSlice";
import userReducer from "../features/users/userSlice";
import crisisReducer from "../features/crisis/crisisSlice";
import donationReducer from "../features/donation/donationSlice";
import expenseReducer from "../features/expense/expenseSlice";
import reliefReducer from "../features/relief/reliefSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    upload: uploadReducer,
    users: userReducer,
    crisis: crisisReducer,
    donation: donationReducer,
    expense: expenseReducer,
    relief: reliefReducer,
    volunteers: volunteerReducer,
  },
});
