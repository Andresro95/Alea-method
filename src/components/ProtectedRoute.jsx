import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("usuario_sesion"));

  // Si no hay usuario, mandarlo al home o login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si el rol no está permitido, mandarlo al home
  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  // IMPORTANTE: Esto es lo que permite que se vea el Dashboard
  return <Outlet />;
};

export default ProtectedRoute;
