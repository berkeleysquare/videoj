import React, {useState} from "react";
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import VideoDialog from './dialogs/video_dialog';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {initialValues, DEFAULT_ID} from './common/constants';
import {wrapIds} from './components/video_form';
import {isFetching} from "./common/actions";
import {CircularProgress, InputLabel} from "@material-ui/core";
import DownloadButton from "./components/download_button";


const albumDisplay = props => {
  const {album, fetching} = props;

  if (!album.title) {
    return (<div/>);
  }
  if (fetching) {
    return (<CircularProgress/>)
  }

  const albumTitle = album.title || '';
  const ensembles = album.ensembles || [];

  const [ensemble, setEnsemble] = useState('');
  const [title, setTitle] = useState('');
  const [videos, setVideos] = useState(album.data || []);
  const [defaultVideo, setDefaultVideo] = useState(album.defaultID || DEFAULT_ID)

  const saveVideo = newVid => {
    // remove if it exists
    const removed = videos.slice().filter(v => v.id != newVid.id);
    // add it
    removed.push(wrapIds(newVid));
    setVideos(removed);
  };

  const deleteVideo = id => {
    // remove if it exists
    const removed = videos.slice().filter(v => v.id != id);
    setVideos(removed);
  };

  const handleEnsembleChange = event => {
    setEnsemble(event.target.value);
  }

  const handleSearchChange = event => {
    setTitle(event.target.value);
  }

  const baseEnsembleOptions = [<MenuItem key={'ensemble_all'} value={''}>{'All Ensembles'}</MenuItem>];
  const options = ensembles ? ensembles.map((e, i) => {
      return (<MenuItem key={'ensemble_' + i} value={e.id}>{e.text}</MenuItem>)
    }) : [];
  const ensembleOptions = [...baseEnsembleOptions, ...options];

  const sortedVideos = videos.sort((a, b) => b.id - a.id);
  const max_id = (sortedVideos[0] || {}).id || DEFAULT_ID;

  const filteredVideos = (ensemble && ensemble.length) ?
    (sortedVideos || []).filter(v => v.ensemble === ensemble) :
    sortedVideos;

  const searchedVideos = (title && title.length) ?
    filteredVideos.filter(v => v.title.toLowerCase().startsWith(title.toLowerCase())) :
    filteredVideos;

  // defaults for "New Video"
  const newValues = {
    ...initialValues,
    id: max_id + 10,
    album: albumTitle,
    ensemble,
    collection: album.collection || '',
  };

  // updated doc for download
  const jsonDoc = {
    ...album,
    defaultID: defaultVideo,
    data: videos.slice().sort((a, b) => a.id - b.id),
  };

  return (
    <div className="App">
      <Paper elevation={2}>
        <Typography variant={'h4'}>{albumTitle}</Typography>
        <br/>
        <form>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <InputLabel shrink={true}>Ensemble</InputLabel>
              <Select label={'Ensemble'}
                      onChange={handleEnsembleChange}>
                {ensembleOptions}
              </Select><br/>
            </Grid>
            <Grid item xs={12}>
              <TextField value={title}
                         label={'Search Title'}
                         onChange={handleSearchChange} />
            </Grid>
            <Grid item xs={12}>
              <DownloadButton obj={jsonDoc} type={'json'}/><br/>
              <VideoDialog initialValues={newValues}
                           album={album}
                           ensembles={ensembles}
                           onSubmit={saveVideo}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
      {searchedVideos.map (v => {
      return (
        <VideoDialog
          initialValues={v}
          album={album}
          isDefault={defaultVideo == v.id}
          setDefault={setDefaultVideo.bind(null, v.id)}
          deleteItem={deleteVideo.bind(null, v.id)}
          ensembles={ensembles}
          onSubmit={saveVideo} />)
      })}
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

export default connect(mapStateToProps)(albumDisplay);
