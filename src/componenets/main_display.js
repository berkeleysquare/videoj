import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import TitleBar from './title_bar';

import EnsembleSelect from './ensemble_picker';
import Searcher from './searcher';
import PreviewStrip from './preview_strip';
import {withStyles} from '@material-ui/core/styles';

import * as buttons from '../constants'
import {isAudio, isVideo, isYouTube, isVimeo, DEFAULT_ID} from '../constants'
import {fetchResource, isFetching, getDataArray} from '../store/actions'

const styles = theme => ({
  audio: {
    position: 'absolute',
    width: '556px',
    height: '50px',
    left: '22px',
    top: '481px',
    opacity: '0.5'
  },
  back: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .2)), url(/assets/blank_back.jpg)',
  },
  backHalfgone: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .9)), url(/assets/poster_halfgone.jpg)',
  },
  backJkeven: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .9)), url(/assets/poster_jkeven.jpg)',
  },
  backErrand: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .9)), url(/assets/poster_eb.jpg)',
  },
  backBksq1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .8)), url(/assets/poster_bksq.jpg)',
  },
  backBksq2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .9), rgba(0, 0, 0, .8)), url(/assets/poster_bksq2.jpg)',
  },
  backCoffeehouse: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .9)), url(/assets/coffeehouse.jpg)',
  },
  songList: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: '580px',
  },
  player: {
    position: 'absolute',
    width: '556px',
    height: '370px',
    left: '22px',
    top: '131px',
  },
  ensemblePick: {
    position: 'absolute',
    width: '150px',
    height: '480px',
    right: '20px',
    top: '115px',
  },
  collectionTitle: {
    position: 'absolute',
    width: '555px',
    height: '26px',
    left: '23px',
    top: '95px',

    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '36px',
    display: 'flex',
    alignItems: 'flex-end',

    color: '#FFFFFF',
  },
  collectionDescrip: {
    position: 'absolute',
    width: '475px',
    height: '329px',
    left: '612px',
    top: '131px',

    display:  'flex',
    flexDirection: 'column',
    color: '#FFFFFF',
  },
  collectionDescripTitle : {
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    marginTop: '2px',
    marginBottom: '2px',
  },
  collectionDescripText : {
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '24px',
    marginTop: '2px',
    marginBottom: '20px',
  },
});

export const DisplayItem = props => {
  if (props.text && props.text.length) {
    return (
      <div className={props.className}>{props.text}</div>
    );
  }
  return (<div></div>);
};

export const DisplayItems = props => {
  const children = [];
  props.items.forEach( i => {
    if (i.text && i.text.length) {
      children.push(<p className={props.classTitle}>{i.title}</p>);
      children.push(<p className={props.classText}>{i.text}</p>);
    }
  });
  return(
    <div className={props.className}>
      {children}
    </div>
  );
};


const getEnsembleTitle = (id, collection) => {
  const filtered = (collection || []).filter(e => e.id === id);
  if (filtered && filtered.length) {
    return filtered[0].text;
  }
  return '';
};

class mainDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  };

  componentDidMount() {
    this.props.fetchItems(this.props.collection);
  };

  componentDidUpdate(prevProps) {
    const {collection} = this.props;
    if (collection && (prevProps.collection !== collection)) {
      this.props.fetchItems(this.props.collection);
      this.setState({searchText: ''});
    }
  }

  getCurrentVideo = (currentId, currentVideos) => {
    const videos = currentVideos.filter(v => v.id == currentId);
    return (videos && videos.length) ? videos[0] : {};
  };

  // if id does not exist, get video right after or before
  getNearVideo = (currentId, currentVideos) => {
    const nextVideos = currentVideos.filter(v => v.id > currentId).sort((a,b) => a.id - b.id);
    if (nextVideos && nextVideos.length) {
      return nextVideos[0];
    }
    const prevVideos = currentVideos.filter(v => v.id < currentId).sort((a,b) => b.id - a.id);
    return (prevVideos && prevVideos.length) ? prevVideos[0] : {};
  };

  handleSearchTextChange = event => {
    this.setState({searchText: event.target.value});
  };

  clearSearchText = () => {
    this.setState({searchText: ''});
  };

  render() {
    const {
      fetching,
      collectionAssets,
      collectionEnsembles,
      videos,
      id,
      ensemble,
      collection,
      collectionTitle,
      collectionMedia,
      classes} = this.props;

    const filteredEnsemble = (ensemble === 'all')
          ? videos
          : ((!fetching && videos) ? videos.filter(v => v.ensemble === ensemble) : []);

    const filtered = filteredEnsemble
          ? filteredEnsemble.filter(i => i.title.toLowerCase().startsWith(this.state.searchText.toLowerCase()))
          : [] ;

    let video = this.getCurrentVideo(id, filtered);
    // if id not defined (probably not in category) find one
    if(!video.id) {
      video = this.getNearVideo(id, filtered);
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

    let background;
    switch (collection) {
      case 'halfwaygone':
        background = 'backHalfgone';
        break;
      case 'jk_even':
        background = 'backJkeven';
        break;
      case 'bksq1':
        background = 'backBksq1';
        break;
      case 'bksq2':
        background = 'backBksq2';
        break;
      case 'errand':
        background = 'backErrand';
        break;
      case 'coffeehouse':
        background = 'backCoffeehouse';
        break;
      default:
        background = 'back';
        break;
    }

    let composerCopyright = composer || '';
    composerCopyright += copyright ? (' ©' + copyright) : '';

    const ensembleControl = (!fetching && collection) ?
      (
      <EnsembleSelect ensembles={ensembles}
                      ensemble={ensemble}
                      collection={collection}/>
      )
      : (<div></div>);

    const searchControl = (!fetching && collection) ?
      (
      <Searcher items={filtered}
                searchText={this.state.searchText}
                onChange={this.handleSearchTextChange}
                onClear={this.clearSearchText} />
  )
  : (<div></div>);

    return (
      <div className={classes[background]}>
        <TitleBar collection={collectionTitle}
                  ensembleControl={ensembleControl}
                  searchControl={searchControl}/>
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
        {!fetching && <div className={classes.ensemblePick}>

        </div>}
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

        <div  className={classes.songList}>
          <PreviewStrip items={filtered}
                        assets={collectionAssets}
                        id={currentId}/>
        </div>
      </div>
    );
  };
};

function mapStateToProps(state, ownProps) {
  const collection = ownProps.match.params['collection'] || buttons.DEFAULT_COLLECTION;
  const ensemble = ownProps.match.params['ensemble'] || buttons.DEFAULT_ENSEMBLE;

  const videosState = state[collection] || {};
  const collectionDefault = (videosState && videosState.defaultID) || DEFAULT_ID

  const params = new URLSearchParams(ownProps.location.search);
  const id = params.get('id') || collectionDefault;

  return {
    id: parseInt(id),
    collection,
    ensemble,
    collectionTitle: videosState.title || '',
    collectionDescription: videosState.description || '',
    collectionMedia: videosState.media || '',
    collectionAssets: videosState.assets || '/assets/',
    collectionEnsembles: videosState.ensembles || [],
    videos: getDataArray(videosState),
    fetching: isFetching([videosState])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchItems: collection => dispatch(fetchResource(collection)),
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(mainDisplay)));
