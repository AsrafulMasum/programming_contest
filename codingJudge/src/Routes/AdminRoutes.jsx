import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../Pages/Loading/Loading";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function AdminRoutes({ children }) {
  const location = useLocation();

  const { user, loading } = useAuth();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const getDbUser = async () => {
      const res = await fetch(`https://coding-judge-server.vercel.app/users/${user?.email}`);
      const data = await res.json();
      setDbUser(data);
    };
    if (user) {
      getDbUser();
    }
  }, [user]);

  if (loading && !dbUser) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
  }

  if (dbUser && dbUser?.role === "Admin") {
    return children;
  }
}

export default AdminRoutes;
AdminRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
