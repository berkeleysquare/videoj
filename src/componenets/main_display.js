import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EnsembleSelect from './ensemble_picker';
import Searcher from './searcher';
import CollectionSelect from './collection_picker';
import PrevNext, {PREV, NEXT} from './prev_next_button';
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
    height: '540px',
    position: 'absolute',
    top: '80px'
  },
  player: {
    marginLeft: '12px',
    width: '480px',
    height: '360px',
  },
  audio: {
    marginLeft: '12px',
    width: '480px',
    height: '36px',
    position: 'relative',
    top: '-36px',
    marginBottom: '-36px',
    opacity: '0.5'
  },
  titleContent: {
    marginLeft: '12px',
  }
});


export const DEFAULT_ID = 1000;

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

    console.log('collectionAssets', collectionAssets)

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

    const prev = this.getPrevVideo(currentId, filtered);
    const next = this.getNextVideo(currentId, filtered);

    const {title, description, media, poster, composer, copyright} = video;
    const ensembles = collectionEnsembles || [];
    const showAudio = isAudio(media);
    const showVideo = isVideo(media);
    const showYouTube = isYouTube(media);
    const showVimeo = isVimeo(media);
    const youTubeUrl = media => 'https://www.youtube.com/embed/' + media.split(':')[1]
    const vimeoUrl = media => 'https://player.vimeo.com/video/' + media.split(':')[1]

    return (
      <div>
        <Paper className={classes.video}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} className={classes.titleContent}>
              <h1>{title}</h1>
              <p>{description}</p>
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
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
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              {!fetching && <EnsembleSelect ensembles={ensembles} ensemble={ensemble} collection={collection}/>}<br />
              <Searcher items={filtered} searchText={this.state.searchText} onChange={this.handleSearchTextChange} />
              <PrevNext className={classes.player}
                        item={prev}
                        assets={collectionAssets}
                        type={PREV}/>
              <br />
              <PrevNext className={classes.player}
                        item={next}
                        assets={collectionAssets}
                        type={NEXT}/>
            </Grid>
            <Grid item xs={12} sm={9} md={6} className={classes.titleContent}>
              <h2>{composer + (copyright ? (' ©' + copyright) : '')}</h2>
            </Grid>
            <Grid item xs={6} sm={6} md={12} className={classes.titleContent}>
              <CollectionSelect ensembles={ensembles} ensemble={ensemble} collection={collection}/>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  };
};

function mapStateToProps(state, ownProps) {
  const collection = ownProps.match.params['collection'] || buttons.DEFAULT_COLLECTION;
  const ensemble = ownProps.match.params['ensemble'] || buttons.DEFAULT_ENSEMBLE;

  const videosState = state[collection] || {};
  const collectionDefault = (videosState && videosState.defaultId) || DEFAULT_ID

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
