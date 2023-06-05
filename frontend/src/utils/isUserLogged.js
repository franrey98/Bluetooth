const isUserLogged = () => {
  if (window.localStorage.getItem("loginData")) {
    return true;
  } else {
    return false;
  }
};

export default isUserLogged;
