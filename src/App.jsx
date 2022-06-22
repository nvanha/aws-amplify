import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import awsconfig from "./aws-exports";
import { listSongs } from "./graphql/queries";

Amplify.configure(awsconfig);

const App = () => {
  const [songs, setSongs] = useState([]);
  console.log("songs: ", songs);

  const fetchSong = async () => {
    try {
      const songData = await API.graphql(graphqlOperation(listSongs));
      const songList = songData.data.listSongs.items;
      console.log("song list", songList);
      setSongs(songList);
    } catch (error) {
      console.error("error on fetching songs: ", error);
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
        <h2>DEV - My App Content</h2>
      </header>
    </div>
  );
};

export default withAuthenticator(App);
