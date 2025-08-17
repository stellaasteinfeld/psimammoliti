import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import { useAuth } from "./context";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
    </Routes>
  );
}
