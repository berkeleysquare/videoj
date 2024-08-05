import React from "react";
import DownLoadIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";


const downloadDataButton = props => {
  const {obj, title, type} = props;

  let blobURL, fileName;
  let label = 'Download'
  if (type === 'json') {
    const blobJSON = new Blob([JSON.stringify(obj, null, 2)], {type: 'text/plain;charset=utf-8'});
    blobURL = URL.createObjectURL(blobJSON);
    fileName = (title || 'album_data') + '.json';
  } else if (type === 'setlist') {
    label = 'Download SetList JSON';
    const blobJSON = new Blob([JSON.stringify(obj, null, 2)], {type: 'text/plain;charset=utf-8'});
    blobURL = URL.createObjectURL(blobJSON);
    fileName = (encodeURI(title || 'setlist')) + '.json';
  } else {
    label = 'Download SetList HTML';
      const blobTxt = new Blob([obj], {type: 'text/plain;charset=utf-8'});
    blobURL = URL.createObjectURL(blobTxt);
    fileName = (encodeURI(title || 'setlist')) + '.html';
  }

  return (
    <a href={blobURL} download={fileName} target="_blank">
      <Button color={'info'}>
        <DownLoadIcon />
        {label}
      </Button>
    </a>
  );
};

export default downloadDataButton;