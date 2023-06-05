import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    fetchLoginData();
  }, []);

  const fetchLoginData = () => {
    setIsLoading(true);
    try {
      const storedLoginData = window.localStorage.getItem("loginData");
      if (storedLoginData) {
        setLoginData(JSON.parse(storedLoginData));
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error al recuperar los datos de inicio de sesión:", error);
    }
  };

  const register = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3900/api/user/register",
        values
      );
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Te registraste correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        // setTimeout(() => {
        //   history.push("/login");
        // }, 350);
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error en el registro",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setIsLoading(false);
  };

  const login = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3900/api/user/login",
        values
      );
      window.localStorage.setItem("loginData", JSON.stringify(response.data));
      console.log(response);
      setLoginError("");
      setLoginData(response.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        setLoginError("El usuario no existe");
      }
    }
  };

  const logout = async () => {
    window.localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, register, login, logout, loginData, loginError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
