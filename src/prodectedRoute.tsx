import { Navigate } from "react-router";
import { Outlet } from "react-router-dom";
import { STORAGE_KEY_USER } from "./localStorage/UserInfo";

export default function ProtectedRoute() {
const storedUser = localStorage.getItem(STORAGE_KEY_USER);

if (!storedUser) {
  return <Navigate to="/" />;
}

const user = JSON.parse(storedUser);

if (!user.labInfo) {
  return <Navigate to="/labForm" />;
}
  
  return <Outlet />;
}
