import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/header/Header";

import LoginScreen from "./screens/Login/LoginScreen";
import Dashboard from "./screens/Dashboard/Dashboard";
import RegisterScreen from "./screens/Register/RegisterScreen";
import StaffScreen from "./screens/Staff/StaffScreen";
import AddStaffScreen from "./screens/Staff/AddStaffScreen";
import RequestPasswordReset from "./screens/Auth/RequestPasswordReset";

import "./index.css";
import EditStaffScreen from "./screens/Staff/EditStaffScreen";
import StaffProfileScreen from "./screens/Staff/StaffProfileScreen";
import ResidentScreen from "./screens/Resident/ResidentScreen";
import AddResidentScreen from "../src/screens/Resident/AddResidentScreen";
import PasswordReset from "./screens/Auth/PasswordReset";

function App() {
  return (
    <Router>
      <Header />
      <div className="py-3">
        <Container>
          <Route exact path="/" />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/staff/add" component={AddStaffScreen} exact />
          <Route path="/staff/page/:pageNumber" component={StaffScreen} />
          <Route path="/staff/search/:keyword" component={StaffScreen} exact />
          <Route
            path="/staff/search/:keyword/page/:pageNumber"
            component={StaffScreen}
            exact
          />
          <Route path="/staff" component={StaffScreen} exact />
          <Route path="/staff/edit/:id" component={EditStaffScreen} />
          <Route
            path="/staffprofile/:id"
            component={StaffProfileScreen}
            exact
          />
          <Route path="/residents" component={ResidentScreen} exact />
          <Route
            path="/residents/:pageNumber"
            component={ResidentScreen}
            exact
          />
          <Route path="/resident/add" component={AddResidentScreen} exact />
          <Route
            path="/resident/search/:keyword"
            component={ResidentScreen}
            exact
          />
          <Route
            path="/auth/request-password-reset"
            component={RequestPasswordReset}
          />
          <Route
            path="/auth/password-reset/:id/:token"
            component={PasswordReset}
          />
        </Container>
      </div>
    </Router>
  );
}

export default App;
