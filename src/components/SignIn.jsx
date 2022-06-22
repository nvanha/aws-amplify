import { Button, TextField } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SignIn = ({ onSignIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signIn = async () => {
    try {
      const user = await Auth.signIn(username, password);
      history.push("/");
      onSignIn();
    } catch (error) {
      console.error("there was an error logging in: ", error);
    }
  };

  return (
    <div className="signin">
      <TextField
        id="username"
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button id="signInButton" color="primary" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
};

export default SignIn;
