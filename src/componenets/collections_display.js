import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import CollectionPicker, {getCollectionDescription} from './collection_picker';

import {DisplayItem, DisplayItems} from './main_display';

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
  player: {
    position: 'absolute',
    width: '556px',
    height: '370px',
    left: '22px',
    top: '161px',
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

  handleButtonEnter = collectionName => {
    this.setState({collection: collectionName});
  };



  render() {
    const {classes} = this.props;
    const {collection} = this.state;
    const collectionDescription = getCollectionDescription(collection);

    console.log('collection', collection)
    return (
      <div className={classes.blankBack}>
        <TitleBar />
          <DisplayItem text={collectionDescription.title}
                       className={classes.collectionTitle} />
          <DisplayItems
            items={[
              {title: 'Artist', text: collectionDescription.artist},
              {title: 'Description', text: collectionDescription.description},
              {title: 'Date', text: collectionDescription.date},
            ]}
            className={classes.collectionDescrip}
            classTitle={classes.collectionDescripTitle}
            classText={classes.collectionDescripText}
          />
        { collectionDescription.url &&
          <img className={classes.player} src={collectionDescription.url} />}
        <div className={classes.collections}>
          <CollectionPicker className={classes.collections}
            onButtonEnter={this.handleButtonEnter && this.handleButtonEnter.bind(this)}/>
        </div>
      </div>
    );
  };
};

export default withRouter(withStyles(styles)(collectionsDisplay));