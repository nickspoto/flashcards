import { SetStateAction, useState } from "react";
// type User = {
//   email: string,
//   password: string;
// };
const LoginPage = () => {
    const [emailInputValue, setEmailInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");

    const handleEmailInputChange = (event: {
        target: { value: SetStateAction<string> };
      }) => {
        setEmailInputValue(event.target.value);
        console.log("email value "+emailInputValue)
      };
    
    const handlePasswordInputChange = (event: {
        target: { value: SetStateAction<string> };
      }) => {
        setPasswordInputValue(event.target.value);
        console.log("pass value "+passwordInputValue)
      };
    // const handleSubmitButton = () => {
    //   const newUser: User = {
    //     emailInputValue, 
    //     passwordInputValue
    //   };
    // }
    return(
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
        <h1>Login Bozo</h1>
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

        {/* <button
        onClick={handleSubmitButton}
        style={{ color: "green"}}
          >Submit!</button> */}
        
        </center>
    );
};

export default LoginPage;