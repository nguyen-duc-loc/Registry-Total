import classes from "./../../styles/Authentication/AuthenticationForm.module.css";
import LoginForm from "./Login";
import ResetForm from "./Reset";
import { useState } from "react";

const currentYear = new Date().getFullYear();

const AuthenticationForm = () => {
  const [forgotMode, setForgotMode] = useState(false);

  const turnOnForgotMode = () => {
    setForgotMode(true);
  };

  const turnOffForgotMode = () => {
    setForgotMode(false);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!forgotMode && <LoginForm turnOnForgotMode={turnOnForgotMode} />}
      {forgotMode && <ResetForm turnOffForgotMode={turnOffForgotMode} />}

      <div className={classes.copy}>&copy; {currentYear} allright reserved</div>
    </div>
  );
};

export default AuthenticationForm;
