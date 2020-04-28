import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import TitleBar from './title_bar';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EnsembleSelect from './ensemble_picker';
import Searcher from './searcher';
import CollectionSelect from './collection_picker';
import PreviewStrip from './preview_strip';
import {MAIN_WIDTH} from '../constants';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import * as buttons from '../constants'
import {isAudio, isVideo, isYouTube, isVimeo} from '../constants'
import {fetchResource, isFetching, getDataArray} from '../store/actions'

const styles = theme => ({
  video: {
    elevation: 2,
    width: MAIN_WIDTH,
    height: '600px',
    position: 'absolute',
    top: '80px'
  },
  prevNext: {
    marginLeft: '2px',
    minWidth: '240px',
    height: '120px',
  },
  player: {
    marginLeft: '12px',
    width: '480px',
    height: '360px',
  },
  audio: {
    position: 'absolute',
    width: '556px',
    height: '50px',
    left: '22px',
    top: '481px',
    opacity: '0.5'
  },
  blankBack: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: `url(/assets/blank_back.jpg)`,
  },
  songList: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 100,
  },
  player: {
    position: 'absolute',
    width: '556px',
    height: '370px',
    left: '22px',
    top: '161px',
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
    top: '115px',

    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '34px',
    lineHeight: '40px',
    display: 'flex',
    alignItems: 'flex-end',

    color: '#FFFFFF',
  },
  collectionTitle: {
    position: 'absolute',
    width: '555px',
    height: '26px',
    left: '23px',
    top: '115px',

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
    top: '173px',

    display: 'flex',
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

export const DEFAULT_ID = 1000;

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
    const videos = currentVideos.filter(v => v.id === currentId);
    return (videos && videos.length) ? videos[0] : {};
  };

  getNextVideo = (currentId, currentVideos) => {
    const nextVideos = currentVideos.filter(v => v.id > currentId).sort((a,b) => a.id - b.id);
    return (nextVideos && nextVideos.length) ? nextVideos[0] : {};
  };

  getPrevVideo = (currentId, currentVideos) => {
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
      collectionDescription,
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
      video = this.getPrevVideo(id, filtered);
    }
    if(!video.id) {
      video = this.getNextVideo(id, filtered);
    }
    const currentId =  video.id || id;

    const {title, description, media, poster, composer, copyright} = video;
    const ensembles = collectionEnsembles || [];
    const showAudio = isAudio(media);
    const showVideo = isVideo(media);
    const showYouTube = isYouTube(media);
    const showVimeo = isVimeo(media);
    const youTubeUrl = media => 'https://www.youtube.com/embed/' + media.split(':')[1]
    const vimeoUrl = media => 'https://player.vimeo.com/video/' + media.split(':')[1]

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
      <div className={classes.blankBack}>
        <TitleBar collection={collection}
                  ensembleControl={ensembleControl}
                  searchControl={searchControl}/>
        <DisplayItem text={title}
                     className={classes.collectionTitle} />
        <DisplayItems
          items={[
            {title: 'Ensemble', text: video.ensemble},
            {title: 'Description', text: description},
            {title: 'Composer', text: composer + (copyright ? (' ©' + copyright) : '')},
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
          <img className={classes.player} src={collectionAssets + ((poster != null) ? poster.toString() : '__unknown___')} />
          <audio className={classes.audio}
                             controls
                             src={collectionMedia + media} type="audio/mpeg">
          Your browser does not support the audio tag.
          </audio></div>}
          {showYouTube && <div>
            <iframe className={classes.player} src={youTubeUrl(media)}></iframe>
          </div>}
          {showVimeo && <div>
            <iframe className={classes.player} src={vimeoUrl(media)} allow="fullscreen" allowfullscreen></iframe>
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
