import { Button } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = ({ loggedIn, setLoggedIn }) => {
  const AssessLoggedInState = () => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  };

  useEffect(() => {
    AssessLoggedInState();
  }, []);

  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false);
    } catch (err) {
      console.error("error singing out: ", err);
    }
  };

  return (
    <header className="App-header">
      {loggedIn ? (
        <Button variant="contained" color="primary" onClick={signOut}>
          Sign Out
        </Button>
      ) : (
        <Link to="/signin">
          <Button variant="contained" color="primary" onClick={signOut}>
            Sign In
          </Button>
        </Link>
      )}
      <h2>DEV - My App Content</h2>
    </header>
  );
};

export default Header;
