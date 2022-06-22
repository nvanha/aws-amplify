import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { IconButton, Paper } from "@material-ui/core";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import awsconfig from "./aws-exports";
import { listSongs } from "./graphql/queries";
import { updateSong } from "./graphql/mutations";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import FavoriteIcon from "@material-ui/icons/Favorite";

Amplify.configure(awsconfig);

const App = () => {
  const [songs, setSongs] = useState([]);

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

  const addLike = async (idx) => {
    try {
      const song = { ...songs[idx], like: songs[idx].like + 1 };
      delete song.createdAt;
      delete song.updatedAt;

      const songData = await API.graphql(
        graphqlOperation(updateSong, { input: song })
      );
      const songList = [...songs];
      songList[idx] = songData.data.updateSong;
      setSongs(songList);
    } catch (error) {
      console.error("error on adding Like to song: ", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
        <h2>DEV - My App Content</h2>
      </header>
      <div className="songList">
        {songs.map((song, index) => (
          <Paper key={index} variant="outlined" elevation={2}>
            <div className="songCard">
              <IconButton aria-label="play">
                <PlayArrowIcon />
              </IconButton>
              <div>
                <div className="songTitle">{song.title}</div>
                <div className="songOwner">{song.owner}</div>
              </div>
              <div>
                <IconButton aria-label="like" onClick={() => addLike(index)}>
                  <FavoriteIcon />
                </IconButton>
                {song.like}
              </div>
              <div className="songDescription">{song.description}</div>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default withAuthenticator(App);
