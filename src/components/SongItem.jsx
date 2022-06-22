import { IconButton, Paper } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ReactPlayer from "react-player";

const SongItem = ({
  songPlaying,
  song,
  index,
  toggleSong,
  addLike,
  audioURL,
}) => {
  return (
    <>
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
    </>
  );
};

export default SongItem;
