import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import SongList from "./components/SongList";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
        <h2>STAGING - My App Content</h2>
      </header>
      <SongList />
    </div>
  );
};

export default withAuthenticator(App);
