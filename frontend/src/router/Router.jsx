import React, { useEffect, useRef } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { useAuth } from "../hooks/useAuth";
import Homepage from "../pages/Homepage";
import isUserLogged from "../utils/isUserLogged";

const Router = () => {
  const { loginData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userLogged = isUserLogged();
    if (userLogged) {
      navigate("/home", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [loginData]);

  return (
    <Routes>
      <Route path="/home" element={<Homepage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
