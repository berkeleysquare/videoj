import React, {useState, useEffect} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import CollectionPicker, {getCollectionDescription} from './collection_picker';
import {DisplayItem, DisplayItems} from './display_page';

import {DEFAULT_COLLECTION, DEFAULT_ENSEMBLE} from '../constants'

export const styles = theme => ({
  previewStrip: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: '709px',
  },
  audio: {
    position: 'absolute',
    width: '556px',
    height: '50px',
    left: '22px',
    top: '481px',
    opacity: '0.5'
  },
  player: {
    position: 'absolute',
    width: '720px',
    height: '540px',
    left: '22px',
    top: '131px',
  },
  collectionTitle: {
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
  },
  collectionDescrip: {
    position: 'absolute',
    width: '505px',
    height: '329px',
    left: '770px',
    top: '130px',
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
    whiteSpace: 'pre-line',
  },
});

const collectionsDisplay = props => {
  const {classes} = props;
  const [collection, setCollection] = useState(DEFAULT_COLLECTION)

  const collectionDescription = getCollectionDescription(collection);

  const handleButtonEnter = collectionName => {
    setCollection(collectionName);
  };

  return (
    <div>
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
      <Link key={'collect_' + collection}
            to={{
              search: '?collection=' + collection + '&ensemble=' + DEFAULT_ENSEMBLE,
              state: {showCollection: false},
            }}>
        <img className={classes.player}
             alt={collectionDescription.poster}
             src={collectionDescription.poster} />
      </Link>}
      <div className={classes.previewStrip}>
        <CollectionPicker className={classes.previewStrip}
          onButtonEnter={handleButtonEnter}/>
      </div>
    </div>
  );
};

export default withRouter(withStyles(styles)(collectionsDisplay));
