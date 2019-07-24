import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EnsembleSelect from './ensemble_picker';
import CollectionSelect from './collection_picker';
import PrevNext, {PREV, NEXT} from './prev_next_button';
import {MAIN_WIDTH} from '../constants';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import * as buttons from '../constants'
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
  titleContent: {
    marginLeft: '12px',
  }
});


export const DEFAULT_ID = 100;
const DEFAULT_TITLE = 'Skylark';

class mainDisplay extends React.Component {

  componentDidMount() {
    this.props.fetchItems(this.props.collection);
  };

  onEnsembleChange(event) {

  }

  render() {
    const {fetching, collectionEnsembles, videos, id, ensemble, collection, collectionTitle, collectionDescription, collectionMedia, classes} = this.props;

    const filtered = (!fetching && videos) ? videos.filter(v => v.id === id) : [];
    const nextVideos = (!fetching && videos) ? videos.filter(v => v.id > id).sort((a,b) => a.id - b.id) : [];
    const prevVideos = (!fetching && videos) ? videos.filter(v => v.id < id).sort((a,b) => b.id - a.id) : [];
    const video = (filtered && filtered.length) ? filtered[0] : {};
    const prev = (prevVideos && prevVideos.length) ? prevVideos[0] : {};
    const next = (nextVideos && nextVideos.length) ? nextVideos[0] : {};
    const {title, description, media, poster, composer, copyright} = video;
    const ensembles = collectionEnsembles || [];

    return (
      <div>
        <Paper className={classes.video}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} className={classes.titleContent}>
              <h1>{title}</h1>
              <p>{description}</p>
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
              <video className={classes.player}
                     controls
                     poster={'/assets/' + ((poster != null) ? poster.toString() : '__unknown___')}
                src={collectionMedia + media} type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              {!fetching && <EnsembleSelect ensembles={ensembles} ensemble={ensemble} collection={collection}/>}<br />
              <PrevNext className={classes.player}
                        item={prev}
                        type={PREV}/>
              <br />
              <PrevNext className={classes.player}
                        item={next}
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

  const params = new URLSearchParams(ownProps.location.search);
  const id = params.get('id') || DEFAULT_ID;

  const videosState = state ? state[collection] : {};

  return {
    id: parseInt(id),
    collection,
    ensemble,
    collectionTitle: videosState ? videosState.title : '',
    collectionDescription: videosState ? videosState.description : '',
    collectionMedia: videosState ? videosState.media : '',
    collectionEnsembles: videosState ? videosState.ensembles : [],
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
