import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { IconButton, Paper } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Amplify, { API, graphqlOperation, Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import awsconfig from "./aws-exports";
import { updateSong } from "./graphql/mutations";
import { listSongs } from "./graphql/queries";

Amplify.configure(awsconfig);

const App = () => {
  const [songs, setSongs] = useState([]);
  const [songPlaying, setSongPlaying] = useState("");
  const [audioURL, setAudioURL] = useState("");

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

  const toggleSong = async (idx) => {
    if (songPlaying === idx) {
      setSongPlaying("");
      return;
    }

    const songFilePath = songs[idx].filePath;
    try {
      const fileAccessURL = await Storage.get(songFilePath, { expires: 60 });
      console.log("access url: : ", fileAccessURL);
      setSongPlaying(idx);
      setAudioURL(fileAccessURL);
      return;
    } catch (error) {
      console.error("error accessing the file from s2: ", error);
      setAudioURL("");
      setSongPlaying("");
    }
  };

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
          <div key={index}>
            <Paper variant="outlined" elevation={2}>
              <div className="songCard">
                <IconButton aria-label="play" onClick={() => toggleSong(index)}>
                  {songPlaying === index ? <PauseIcon /> : <PlayArrowIcon />}
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
            {songPlaying === index && (
              <div className="ourAudioPlayer">
                <ReactPlayer
                  url={audioURL}
                  controls
                  playing
                  height="50px"
                  onPause={() => toggleSong(index)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuthenticator(App);
