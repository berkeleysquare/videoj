import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import CollectionPicker, {getCollectionDescription} from './collection_picker';
import {DisplayItem, DisplayItems} from './display_page';

import {DEFAULT_COLLECTION} from '../constants'

export const styles = theme => ({
  previewStrip: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: '620px',
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
        <img className={classes.player} alt={collectionDescription.poster} src={collectionDescription.poster} />}
      <div className={classes.previewStrip}>
        <CollectionPicker className={classes.previewStrip}
          onButtonEnter={handleButtonEnter}/>
      </div>
    </div>
  );
};

export default withRouter(withStyles(styles)(collectionsDisplay));
