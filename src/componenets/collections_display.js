import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import CollectionSelect from './collection_picker';


import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EnsembleSelect from './ensemble_picker';
import Searcher from './searcher';
import PreviewStrip from './preview_strip';
import {MAIN_WIDTH} from '../constants';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TitleBar from './title_bar';

import * as buttons from '../constants'
import {isAudio, isVideo, isYouTube, isVimeo} from '../constants'
import {fetchResource, isFetching, getDataArray} from '../store/actions'

const styles = theme => ({
  root: {
    backgroundColor: '#110f34',
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
  collections: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 40,
  },
});



export const DEFAULT_ID = 1000;

class collectionsDisplay extends React.Component {
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
    const {classes} = this.props;

    return (
      <div className={classes.blankBack}>
        <TitleBar />
        <div className={classes.collections}>
          <CollectionSelect className={classes.collections}/>
        </div>
      </div>
    );
  };
};

export default withRouter(withStyles(styles)(collectionsDisplay));
