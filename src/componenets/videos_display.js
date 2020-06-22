import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import {DisplayItem, DisplayItems} from './display_page';
import PreviewStrip from './preview_strip';
import {withStyles} from '@material-ui/core/styles';

import {styles} from './collections_display'
import {isAudio, isVideo, isYouTube, isVimeo, DEFAULT_ID} from '../constants'
import {fetchResource, isFetching, getDataArray} from '../store/actions'

const getEnsembleTitle = (id, collection) => {
  const filtered = (collection || []).filter(e => e.id === id);
  if (filtered && filtered.length) {
    return filtered[0].text;
  }
  return '';
};

const mainDisplay = props => {
  const {
    fetching,
    videos,
    id,
    ensemble,
    collection,
    collectionTitle,
    collectionMedia,
    collectionEnsembles,
    collectionAssets,
    searchText,
    classes} = props;

  const getCurrentVideo = (currentId, currentVideos) => {
    const videos = currentVideos.filter(v => v.id == currentId);
    return (videos && videos.length) ? videos[0] : {};
  };

  // if id does not exist, get video right after or before
  const getNearVideo = (currentId, currentVideos) => {
    const nextVideos = currentVideos.filter(v => v.id > currentId).sort((a,b) => a.id - b.id);
    if (nextVideos && nextVideos.length) {
      return nextVideos[0];
    }
    const prevVideos = currentVideos.filter(v => v.id < currentId).sort((a,b) => b.id - a.id);
    return (prevVideos && prevVideos.length) ? prevVideos[0] : {};
  };


  const filteredEnsemble = (ensemble === 'all')
        ? videos
        : ((!fetching && videos) ? videos.filter(v => v.ensemble === ensemble) : []);

  const filtered = filteredEnsemble
        ? filteredEnsemble.filter(i => i.title.toLowerCase().startsWith(searchText.toLowerCase()))
        : [] ;

  let video = getCurrentVideo(id, filtered);
  // if id not defined (probably not in category) find one
  if(!video.id) {
    video = getNearVideo(id, filtered);
  }
  const currentId =  video.id || id;

  const {title, description, media, poster, recorded, composer, copyright} = video;
  const ensembles = collectionEnsembles || [];
  const showAudio = isAudio(media);
  const showVideo = isVideo(media);
  const showYouTube = isYouTube(media);
  const showVimeo = isVimeo(media);
  const youTubeUrl = media => 'https://www.youtube.com/embed/' + media.split(':')[1]
  const vimeoUrl = media => 'https://player.vimeo.com/video/' + media.split(':')[1]

  let composerCopyright = composer || '';
  composerCopyright += copyright ? (' ©' + copyright) : '';


  return (
    <div>
      <DisplayItem text={title}
                   className={classes.collectionTitle} />
      <DisplayItems
        items={[
          {title: 'Ensemble', text: getEnsembleTitle(video.ensemble, ensembles)},
          {title: 'Description', text: description},
          {title: 'Released', text: recorded},
          {title: 'Composer', text: composerCopyright},
        ]}
        className={classes.collectionDescrip}
        classTitle={classes.collectionDescripTitle}
        classText={classes.collectionDescripText}
      />
      {showVideo && <video className={classes.player}
                 controls
                 poster={collectionAssets + ((poster != null) ? poster.toString() : '__unknown___')}
                 src={collectionMedia + media} type="video/mp4">
                Your browser does not support the video tag.
            </video>}
      {showAudio && <div>
        <img className={classes.player}
             alt={(poster != null) ? poster.toString() : '__unknown___'}
             src={collectionAssets + ((poster != null) ? poster.toString() : '__unknown___')} />
        <audio className={classes.audio}
                           controls
                           src={collectionMedia + media} type="audio/mpeg">
        Your browser does not support the audio tag.
        </audio></div>}
        {showYouTube && <div>
          <iframe title={'YouTubePlayer'} className={classes.player} src={youTubeUrl(media)}></iframe>
        </div>}
        {showVimeo && <div>
          <iframe title={'Vimeo Player'} className={classes.player} src={vimeoUrl(media)} allow="fullscreen" allowfullscreen></iframe>
        </div>}

      <div  className={classes.previewStrip}>
        <PreviewStrip items={filtered}
                      assets={collectionAssets}
                      collection={collection}
                      ensemble={ensemble}
                      id={currentId}/>
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {

  const videosState = state[ownProps.collection] || {};
  const collectionDefault = (videosState && videosState.defaultID) || DEFAULT_ID
  const params = new URLSearchParams(ownProps.location.search);
  const id = params.get('id') || collectionDefault;

  return {
    id: parseInt(id),
    collection: ownProps.collection,
    ensemble: ownProps.ensemble,
    collectionTitle: videosState.title || '',
    collectionDescription: videosState.description || '',
    collectionMedia: videosState.media || '',
    collectionAssets: videosState.assets || '/assets/',
    collectionEnsembles: videosState.ensembles || [],
    videos: getDataArray(videosState),
    fetching: isFetching([videosState])
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(mainDisplay)));
