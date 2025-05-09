import { CircularProgress } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectLoaded,
  selectUser,
} from "../../services/redux/modules/user/selector";
import { selectAccounts } from "../../services/redux/modules/admin/selector";
import { useNavigate } from "../../services/hooks/useNavigate";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({
  children,
}: PrivateRouteProps): ReactNode {
  const user = useSelector(selectUser);
  const accounts = useSelector(selectAccounts);
  const loaded = useSelector(selectLoaded);
  const navigate = useNavigate();

  useEffect(() => {
    if (loaded && !user) {
      navigate("/login");
    }
  }, [loaded, navigate, user]);

  if (!loaded) {
    return <CircularProgress />;
  }
  if (!user || !accounts || accounts.length === 0) {
    return <div />;
  }
  return children;
}
