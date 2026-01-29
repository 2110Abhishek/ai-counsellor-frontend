import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export default function StageGuard({ minStage, children }) {
  const stage = useUserStore((s) => s.stage);

  if (stage === null) return <Navigate to="/login" />;
  if (stage < minStage) return <Navigate to="/dashboard" />;

  return children;
}