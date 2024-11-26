import { SetStateAction, useState } from "react";
import { useAuth } from "../auth/AuthUserProvider";
import { signIn, signOut } from "../auth/auth";
import { Button } from "../components/button";

const AccountPage = (onLogin: { (email: string, password: string): void }) => {
  const { user } = useAuth();
  console.log("user is "+user);

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

  const handleSignIn = () => {
    signIn()
  }

  return (
    <center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column" as const,
        paddingRight: "20px",
        paddingLeft: "20px",
      }}
    >
      {user ? <h1>Logout {user.displayName}</h1>: <h1>Login Bozo</h1>}
      {user ? <p></p>: <div><p>Email:</p>
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
      </button></div>}
      <div className="flex flex-row w-full justify-center p-4">
      {user ? (
        <div className="flex flex-col items-center">
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Button className="w-fit" onClick={handleSignIn}>
            <div className="flex flex-row p-1 space-x-2">
              <p>Sign in with Google</p>
            </div>
          </Button>
        </div>
      )}
      </div>
    </center>
  );
};

export default AccountPage;
