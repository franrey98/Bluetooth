import React from "react";
import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";

const AppAuthContext = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const App = () => {
  return (
    <AppAuthContext>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppAuthContext>
  );
};

export default App;
