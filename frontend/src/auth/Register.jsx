import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { register } = useAuth();

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
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Registro</h2>
        <Formik
          initialValues={{ name: "", lastName: "", email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Nombre requerido";
            }
            if (!values.lastName) {
              errors.lastName = "Apellido requerido";
            }
            if (!values.email) {
              errors.email = "Email requerido";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Email invalido";
            }
            if (!values.password) {
              errors.password = "Contraseña requerida";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            register(values);
            setSubmitting(false);
            resetForm();
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
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "500px",
              }}
            >
              {errors.name && touched.name && (
                <div style={{ color: "red" }}>{errors.name}</div>
              )}
              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Nombre"
                style={{ marginBottom: "15px", padding: "5px" }}
              />

              {errors.lastName && touched.lastName && (
                <div style={{ color: "red" }}>{errors.lastName}</div>
              )}
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                placeholder="Apellido"
                style={{ marginBottom: "15px", padding: "5px" }}
              />
              {errors.email && touched.email && (
                <div style={{ color: "red" }}>{errors.email}</div>
              )}
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
                style={{ marginBottom: "15px", padding: "5px" }}
              />
              {errors.password && touched.password && (
                <div style={{ color: "red" }}>{errors.password}</div>
              )}
              <input
                type="text"
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
                }}
              >
                Registrar usuario
              </button>
            </form>
          )}
        </Formik>
        <div style={{ display: "flex" }}>
          <Link
            to={"/login"}
            style={{
              marginTop: "10px",
              color: "white",
              textDecoration: "underline",
              width: "100%",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Ir al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
