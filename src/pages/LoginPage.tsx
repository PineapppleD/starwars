import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";
import { useEffect } from "react";

const LoginPage = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/entities/people");
    }
    console.log(isAuthenticated)
  }, [isAuthenticated, navigate])


  return <LoginForm />;
};

export default LoginPage;