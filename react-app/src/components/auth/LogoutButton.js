import React from "react";
import { logout } from "../../utils/auth";

const LogoutButton = ({setAuthenticated}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return <button onClick={onLogout}></button>;
};

export default LogoutButton;
