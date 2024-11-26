import { SetStateAction, useState } from "react";

const LoginPage = (onLogin: { (email: string, password: string): void }) => {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");

  const handleEmailInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmailInputValue(event.target.value);
    console.log("email value " + emailInputValue);
  };

  const handlePasswordInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPasswordInputValue(event.target.value);
    console.log("pass value " + passwordInputValue);
  };

  const handleSubmitButton = () => {
    onLogin(emailInputValue, passwordInputValue);
    //authenticate later
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column" as const,
        paddingRight: "20px",
        paddingLeft: "20px",
        width: "100vw",
      }}
    >
      <h1>Login</h1>
      <p>Email:</p>
      <input
        placeholder="Your Email"
        value={emailInputValue}
        style={{ marginBottom: "10px" }}
        onChange={handleEmailInputChange}
      ></input>
      <p>Password:</p>
      <input
        placeholder="Your Password"
        value={passwordInputValue}
        style={{ marginBottom: "10px" }}
        onChange={handlePasswordInputChange}
      ></input>

      <button onClick={handleSubmitButton} style={{ color: "green" }}>
        Submit!
      </button>
    </div>
  );
};

export default LoginPage;
