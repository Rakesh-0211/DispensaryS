import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLogin, children }) => {
  if (!isLogin) {
    if (!toast.isActive("login-toast")) {   // ✅ prevent duplicate
      toast.error("Please login first!", { toastId: "login-toast" });
    }
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
