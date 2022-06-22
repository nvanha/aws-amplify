import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import AddSong from "../components/AddSong";
import { updateSong } from "../graphql/mutations";
import { listSongs } from "../graphql/queries";
import SongItem from "./SongItem";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [songPlaying, setSongPlaying] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [showAddSong, setShowAddSong] = useState(false);

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
    <div className="songList">
      {songs.map((song, index) => (
        <SongItem
          key={index}
          song={song}
          songPlaying={songPlaying}
          index={index}
          toggleSong={toggleSong}
          addLike={addLike}
          audioURL={audioURL}
        />
      ))}
      {showAddSong ? (
        <AddSong
          onUpload={() => {
            setShowAddSong(false);
            fetchSong();
          }}
        />
      ) : (
        <IconButton onClick={() => setShowAddSong(true)}>
          <AddIcon />
        </IconButton>
      )}
    </div>
  );
};

export default SongList;
