import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
        <h2>DEV - My App Content</h2>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
