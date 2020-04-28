import React from 'react';
import {connect} from "react-redux";
import {withRouter, Link} from 'react-router-dom';

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
  titleBar: {
    marginTop: '6px',
    marginBottom: '6px',
    backgroundColor: 'rgba(90, 33, 211, 0.6)',
    minHeight: '44px',
  },
  titleContent: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  menuButtons: {
    position: 'absolute',
    top: 1,
    left: 190,
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'flex-end',
  },
  menuButton: {
    backgroundColor: 'rgba(90, 33, 211, 0.6)',
    fontSize: '14px',
    color: '#FFFFFF',
  },
});

class titleBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  };

  handleSearchTextChange = event => {
    this.setState({searchText: event.target.value});
  };

  clearSearchText = () => {
    this.setState({searchText: ''});
  };

  render() {
    const {classes, collection, ensembleControl, searchControl} = this.props;

    return (
      <div className={classes.titleBar}>
        <span
          className={classes.titleContent}
          style={{
            backgroundImage: `url(/assets/logo.jpg)`,
            width: 110,
            height: 34,
          }}
        />
        <div className={classes.menuButtons}>
          <Link to={'/'}><Button className={classes.menuButton}>Home</Button></Link>
          <Link to={'/albums/'}><Button className={classes.menuButton}>Collections</Button></Link>
          {collection && <Button className={classes.menuButton}>{collection}</Button>}
          {ensembleControl}
          {searchControl}
        </div>

      </div>
    );
  };
};

export default withRouter(withStyles(styles)(titleBar));
