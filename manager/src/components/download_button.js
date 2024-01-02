import React from "react";
import DownLoadIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";


const downloadDataButton = props => {
  const {obj, type} = props;

  let blobURL, fileName;
  if (type === 'json') {
    const blobJSON = new Blob([JSON.stringify(obj, null, 2)], {type: 'text/plain;charset=utf-8'});
    blobURL = URL.createObjectURL(blobJSON);
    fileName = (obj.collection || 'album_data') + '.json';
  } else {
    const blobTxt = new Blob([obj], {type: 'text/plain;charset=utf-8'});
    blobURL = URL.createObjectURL(blobTxt);
    fileName = 'setlist.html';
  }

  return (
    <a href={blobURL} download={fileName} target="_blank">
      <Button color={'info'}>
        <DownLoadIcon />
        {'Download'}
      </Button>
    </a>
  );
};

export default downloadDataButton;