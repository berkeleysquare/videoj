import React from 'react';
import {connect} from "react-redux";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PrevNext, {PREV, NEXT} from './prev_next_button';
import {MAIN_WIDTH} from '../constants';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {createTable, Crud, cRud, crUd, cruD} from '../db/dynamodb'

import * as buttons from '../constants'
import {fetchResource, isFetching, getDataArray} from '../store/actions'

const styles = theme => ({
  video: {
    elevation: 2,
    width: MAIN_WIDTH,
    height: '500px',
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

const DEFAULT_COLLECTION = 'jkboxed';
const DEFAULT_TITLE = 'Skylark';

class mainDisplay extends React.Component {

  componentDidMount() {
    this.props.fetchItems();
  };

  render() {
    const {fetching, videos, title, collection, classes} = this.props;

    const filtered = (!fetching && videos) ? videos.filter(v => v.title === title) : [];
    const video = (filtered && filtered.length) ? filtered[0] : {};
    const {description, media, poster, composer, copyright} = video;

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
                     poster={'/assets/' + poster}
                src={media} type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <PrevNext className={classes.player}
                        title={'Wave'}
                        imgSrc="/assets/Wave.jpg"
                        type={PREV}/>
              <br />
              <PrevNext className={classes.player}
                        title={'Blues in the Night`'}
                        imgSrc="/assets/BluesInTheNight.jpg"
                        type={NEXT}/>
            </Grid>
            <Grid item xs={12} sm={9} md={6} className={classes.titleContent}>
              <h2>{composer + (copyright ? (' ©' + copyright) : '')}</h2>
            </Grid>
            <Grid item xs={12} sm={3} md={6}>
              <Button onClick={createTable.bind()}>{'Table'}</Button>
              <Button onClick={Crud.bind()}>{'Create'}</Button>
              <Button onClick={cRud.bind()}>{'Retrieve'}</Button>
              <Button onClick={crUd.bind()}>{'Update'}</Button>
              <Button onClick={cruD.bind()}>{'Delete'}</Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  };
};

function mapStateToProps(state, ownProps) {
  const videosState = state ? state[buttons.JKBOXED] : {};
  const collection = ownProps.collection || DEFAULT_COLLECTION;
  const title = ownProps.title || DEFAULT_TITLE;

  return {
    title,
    collection,
    videos: getDataArray(videosState),
    fetching: isFetching([videosState])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchItems: () => dispatch(fetchResource(buttons.JKBOXED)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(mainDisplay));
