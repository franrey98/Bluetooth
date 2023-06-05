import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login, loginError, isLoading } = useAuth();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <div
        style={{
          padding: "20px",
          width: "350px",
          backgroundColor: "#4443a5",
          borderRadius: "5px",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Inicio de sesión
        </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.password) {
              errors.password = "La contraseña es requerida";
            }
            if (!values.email) {
              errors.email = "El email es requerido";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            login(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm,
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "500px",
              }}
            >
              {errors.email && touched.email && (
                <div
                  style={{
                    color: "#ff0000",
                    fontSize: "18px",
                    fontWeight: "normal",
                  }}
                >
                  {errors.email}
                </div>
              )}
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
                style={{ marginBottom: "10px", padding: "5px" }}
              />
              {errors.password && touched.password && (
                <div
                  style={{
                    color: "#ff0000",
                    fontSize: "18px",
                    fontWeight: "normal",
                  }}
                >
                  {errors.password}
                </div>
              )}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Contraseña"
                style={{ marginBottom: "20px", padding: "5px" }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  marginBottom: "10px",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #559fca",
                  backgroundColor: "#559fca",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {"ingresar".toUpperCase()}
              </button>
            </form>
          )}
        </Formik>
        {loginError !== "" && (
          <span style={{ color: "red", marginTop: 5, marginBottom: 5 }}>
            {loginError}
          </span>
        )}
        <div style={{ display: "flex" }}>
          <Link
            to={"/register"}
            style={{
              textAlign: "center",
              color: "white",
              textDecoration: "underline",
              width: "100%",
              marginTop: "10px",
            }}
          >
            Ir al registro
          </Link>
        </div>
      </div>
      {isLoading && (
        <p style={{ color: "green", fontSize: "20px" }}>Cargando ...</p>
      )}
    </div>
  );
};

export default Login;
