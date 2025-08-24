import React from 'react';
import {connect} from "react-redux";
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import { styled } from '@mui/material/styles';

import {DisplayItem, DisplayItems} from './display_page';
import PreviewStrip from './preview_strip';

import {isAudio, isVideo, isYouTube, isVimeo, DEFAULT_ID} from '../constants'
import {fetchResource, isFetching, getDataArray} from '../store/actions'

// Styled components for videos display
const PreviewStripContainer = styled('div')({
  position: 'absolute',
  left: 20,
  right: 20,
  top: '709px',
});

const Audio = styled('audio')({
  position: 'absolute',
  width: '556px',
  height: '50px',
  left: '22px',
  top: '481px',
  opacity: '0.5'
});

const Player = styled('video')({
  position: 'absolute',
  width: '720px',
  height: '540px',
  left: '22px',
  top: '131px',
});

const PlayerImage = styled('img')({
  position: 'absolute',
  width: '720px',
  height: '540px',
  left: '22px',
  top: '131px',
});

const PlayerIframe = styled('iframe')({
  position: 'absolute',
  width: '720px',
  height: '540px',
  left: '22px',
  top: '131px',
});

const CollectionTitle = styled('div')({
  position: 'absolute',
  width: '555px',
  height: '26px',
  left: '23px',
  top: '85px',
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '30px',
  lineHeight: '36px',
  display: 'flex',
  alignItems: 'flex-end',
  color: '#FFFFFF',
});

const CollectionDescrip = styled('div')({
  position: 'absolute',
  width: '505px',
  height: '329px',
  left: '770px',
  top: '130px',
  display: 'flex',
  flexDirection: 'column',
  color: '#FFFFFF',
});

const CollectionDescripTitle = styled('div')({
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  marginTop: '2px',
  marginBottom: '2px',
});

const CollectionDescripText = styled('div')({
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '20px',
  lineHeight: '24px',
  marginTop: '2px',
  marginBottom: '20px',
  whiteSpace: 'pre-line',
});

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
    ensemble,
    collection,
    collectionTitle,
    collectionMedia,
    collectionEnsembles,
    collectionAssets,
    searchText} = props;

  // React Router hooks replace withRouter
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  
  // Get id from URL params using React Router hooks
  const videosState = props.videos || {};
  const collectionDefault = props.defaultID || DEFAULT_ID;
  const urlParams = new URLSearchParams(location.search);
  const id = parseInt(urlParams.get('id') || collectionDefault);

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
                   component={CollectionTitle} />
      <DisplayItems
        items={[
          {title: 'Ensemble', text: getEnsembleTitle(video.ensemble, ensembles)},
          {title: 'Description', text: description},
          {title: 'Released', text: recorded},
          {title: 'Composer', text: composerCopyright},
        ]}
        component={CollectionDescrip}
        titleComponent={CollectionDescripTitle}
        textComponent={CollectionDescripText}
      />
      {showVideo && <Player
                 controls
                 poster={collectionAssets + ((poster != null) ? poster.toString() : '__unknown___')}
                 src={collectionMedia + media} type="video/mp4">
                Your browser does not support the video tag.
            </Player>}
      {showAudio && <div>
        <PlayerImage
             alt={(poster != null) ? poster.toString() : '__unknown___'}
             src={collectionAssets + ((poster != null) ? poster.toString() : '__unknown___')} />
        <Audio
                           controls
                           src={collectionMedia + media} type="audio/mpeg">
        Your browser does not support the audio tag.
        </Audio></div>}
        {showYouTube && <div>
          <PlayerIframe title={'YouTubePlayer'} src={youTubeUrl(media)}></PlayerIframe>
        </div>}
        {showVimeo && <div>
          <PlayerIframe title={'Vimeo Player'} src={vimeoUrl(media)} allow="fullscreen" allowFullScreen></PlayerIframe>
        </div>}

      <PreviewStripContainer>
        <PreviewStrip items={filtered}
                      assets={collectionAssets}
                      collection={collection}
                      ensemble={ensemble}
                      id={currentId}/>
      </PreviewStripContainer>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  const videosState = state[ownProps.collection] || {};
  
  return {
    collection: ownProps.collection,
    ensemble: ownProps.ensemble,
    defaultID: videosState.defaultID,
    collectionTitle: videosState.title || '',
    collectionDescription: videosState.description || '',
    collectionMedia: videosState.media || '',
    collectionAssets: videosState.assets || '/assets/',
    collectionEnsembles: videosState.ensembles || [],
    videos: getDataArray(videosState),
    fetching: isFetching([videosState])
  };
}

export default connect(mapStateToProps)(mainDisplay);
