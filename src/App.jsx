import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import SongList from "./components/SongList";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const onSignIn = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <Route exact path="/">
            <SongList />
          </Route>
          <Route path="/signin">
            <SignIn onSignIn={onSignIn} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default withAuthenticator(App);
