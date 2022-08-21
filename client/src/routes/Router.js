import { Routes, Route } from "react-router-dom";
import Register from "../views/Register";
import Login from "../views/Login";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
