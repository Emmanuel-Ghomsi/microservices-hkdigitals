import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// From redux - dispatch event && get store state status
import { useDispatch, useSelector } from "react-redux";

import Footer from "../components/home/Footer";
import Header from "../components/home/Header";

import "../assets/scss/dashboard.scss"

export default function Dashboard() {
  const navigate = useNavigate(); // redirect and navigate
  const dispatch = useDispatch(); // dispatch events

  const auth = useSelector((state) => state.auth); // get store state status from auth

  // Before mount, mount and update component
  useEffect(() => {
    // Check if user already authenticated and redirect to dashboard
    if (!auth.token && !auth._id) navigate("/signin");
  }, [auth]);

  return (
    <div className="body-wrap">
      <Header />

      <div>Dashboard</div>

      <Footer />
    </div>
  );
}
