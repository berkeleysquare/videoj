import React, {useState} from "react";
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import {formatList} from './setlist_formatting';
import {isFetching} from "./common/actions";
import {CircularProgress} from "@material-ui/core";
import DownloadButton from "./components/download_button";
import Button from "@material-ui/core/Button";


const SongButton = props => {
  const {title, onClick} = props;

  return (
    <Button variant="outlined" color="primary" onClick={onClick}>
      {title}
    </Button>
  )
};
const inList = (title, list) => {
  return list.find(s => s.title === title) !== undefined;
};


const setlist = props => {
  const {album, fetching} = props;

  if (!album.title) {
    return (<div/>);
  }
  if (fetching) {
    return (<CircularProgress/>)
  }

  const albumTitle = album.title || '';

  const [title, setTitle] = useState('');
  const [setList, setSetList] = useState([]);
  const [setListTitle, setSetListTitle] = useState('');

  const addSong = songTitle => {
    const newList = setList.slice();
    newList.push(songTitle);
    setSetList(newList);
  }

  const removeSong = index => {
    const newList = setList.slice();
    newList.splice(index, 1);
    setSetList(newList);
  }

  const songUp = index => {
    if ((index > 0) && (setList.length > index)) {
      const newList = setList.slice();
      [newList[index], newList[index-1]] = [newList[index-1], newList[index]];
      setSetList(newList);    }
  }

  const songDown = index => {
    if ((index >= 0) && (setList.length > index + 1)) {
      const newList = setList.slice();
      [newList[index+1], newList[index]] = [newList[index], newList[index+1]];
      setSetList(newList);    }
  }

  const videos = album.data || [];

  const handleSearchChange = event => {
    setTitle(event.target.value);
  }

  const handleSetListTitleChange = event => {
    setSetListTitle(event.target.value);
  }

  const sortedVideos = videos.sort((a, b) => b.id - a.id);

  const searchedVideos = (title && title.length) ?
    sortedVideos.filter(v => v.title.toLowerCase().startsWith(title.toLowerCase())) :
    sortedVideos;

  return (
    <div className="App">
      <Paper elevation={2}>
        <Typography variant={'h4'}>{albumTitle}</Typography>
        <br/>
        <TextField value={title}
                   label={'Search Song Titles'}
                   onChange={handleSearchChange} />     
        <TextField value={setListTitle}
                   label={'Set List Title'}
                   onChange={handleSetListTitleChange} /> 
                   <br/>
        <p>{(searchedVideos || []).length} songs found</p>           
      </Paper>
      <table>
        <tr>
          <td valign={'top'}>
            <h4>Songs</h4>
            {searchedVideos.map(v => ((<>
              {inList(v.title, setList) && <span>&#x2713; </span>}
              <SongButton title={v.title} onClick={addSong.bind(null, v)} />
              <br/>
            </>)))}
          </td>
          <td valign={'top'}>
            <h4>Set List</h4>
            {setList.length > 0 && 
              <DownloadButton obj={formatList(setList, setListTitle)} type={'text'}/>}
            <br/>
            {setList.map((v,i) => ((<>
              <Button>{i + 1}</Button>
              <SongButton title={v.title}/>
              {i > 0 && <Button onClick={songUp.bind(null, i)}>UP</Button>}
              {i < setList.length - 1 && <Button onClick={songDown.bind(null, i)}>DOWN</Button>}
              <Button onClick={removeSong.bind(null, i)}>X</Button>
              <br/>
            </>)))}
          </td>
        </tr>
      </table>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  const albumName = ownProps.album || '';
  const album = state[albumName] || {};

  return {
    album,
    fetching: isFetching([album])
  };
};

export default connect(mapStateToProps)(setlist);
