import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import MainLayout from "./Components/MainLayout";
import UserList from "./Pages/UserList";
import AddCrisis from "./Pages/AddCrisis";
import CrisisList from "./Pages/CrisisList";
import AddDonation from "./Pages/AddDonation";
import DonationList from "./Pages/DonationList";
import { useSelector } from "react-redux";
import PrivateRoute from "./Components/PrivateRoute";
import EditProfile from "./Components/EditProfile";
import AddExpense from "./Pages/AddExpense";
import ExpenseList from "./Pages/ExpenseList";
import AddRelief from "./Pages/AddRelief";
import ReliefList from "./Pages/ReliefList";
import DownloadReports from "./Pages/DownloadReports";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Public Routes inside MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/volunteers" element={<UserList />} />
            <Route path="/crisis" element={<AddCrisis />} />
            <Route path="/list-crisis" element={<CrisisList />} />
            <Route path="/donation" element={<AddDonation />} />
            <Route path="/chart-donation" element={<DonationList />} />

            {/* Private Routes */}
            <Route
              path="/edit-profile"
              element={
                <PrivateRoute
                  isAuthenticated={!!user}
                  component={() => <EditProfile userId={user?._id} />}
                />
              }
            />
            <Route
              path="/add-expense"
              element={
                <PrivateRoute isAuthenticated={!!user} component={AddExpense} />
              }
            />
            <Route
              path="/expenses"
              element={
                <PrivateRoute
                  isAuthenticated={!!user}
                  component={ExpenseList}
                />
              }
            />
            <Route
              path="/relief"
              element={
                <PrivateRoute isAuthenticated={!!user} component={AddRelief} />
              }
            />
            <Route
              path="/relief-list"
              element={
                <PrivateRoute isAuthenticated={!!user} component={ReliefList} />
              }
            />
            {/* Admin-only route for downloading reports */}
            <Route
              path="/generate-report"
              element={
                <PrivateRoute
                  isAuthenticated={!!user && user.role === "admin"}
                  component={DownloadReports}
                />
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
