import { IconButton, TextField } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { useState } from "react";
import { createSong } from "../graphql/mutations";
import { v4 as uuid } from "uuid";

const AddSong = ({ onUpload }) => {
  const [songData, setSongData] = useState({
    title: "",
    owner: "",
    description: "",
  });

  const [mp3Data, setMp3Data] = useState();

  const uploadSong = async () => {
    // Upload the song
    console.log("songData", songData);
    const { title, owner, description } = songData;

    const { key } = await Storage.put(`${uuid()}.mp3`, mp3Data, {
      contentType: "audio/mp3",
    });

    const createSongInput = {
      id: uuid(),
      title,
      owner,
      description,
      filePath: key,
      like: 0,
    };
    await API.graphql(graphqlOperation(createSong, { input: createSongInput }));
    onUpload();
  };

  return (
    <div className="newSong">
      <TextField
        label="Title"
        value={songData.title}
        onChange={(event) =>
          setSongData({ ...songData, title: event.target.value })
        }
      />
      <TextField
        label="Artist"
        value={songData.owner}
        onChange={(event) =>
          setSongData({ ...songData, owner: event.target.value })
        }
      />
      <TextField
        label="Description"
        value={songData.description}
        onChange={(event) =>
          setSongData({ ...songData, description: event.target.value })
        }
      />
      <input
        type="file"
        accept="audio/mp3"
        onChange={(event) => setMp3Data(event.target.files[0])}
      />
      <IconButton onClick={uploadSong}>
        <PublishIcon />
      </IconButton>
    </div>
  );
};

export default AddSong;
