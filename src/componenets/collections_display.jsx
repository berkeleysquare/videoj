import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation, useParams, Link} from 'react-router-dom';
import { styled } from '@mui/material/styles';

import CollectionPicker, {getCollectionDescription} from './collection_picker';
import {DisplayItem, DisplayItems} from './display_page';

import {DEFAULT_COLLECTION, DEFAULT_ENSEMBLE} from '../constants'
import { connect } from 'react-redux';
import { fetchResource, getDataArray } from '../store/actions';

const PreviewStrip = styled('div')({
  position: 'absolute',
  left: 20,
  right: 20,
  top: '709px',
});

const Audio = styled('div')({
  position: 'absolute',
  width: '556px',
  height: '50px',
  left: '22px',
  top: '481px',
  opacity: '0.5'
});

const Player = styled('img')({
  position: 'absolute',
  width: '720px',
  height: '540px',
  left: '22px',
  top: '131px',
});

const CollectionTitle = styled('div')({
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
});

const CollectionDescrip = styled('div')({
  position: 'absolute',
  width: '505px',
  height: '329px',
  left: '770px',
  top: '130px',
  display: 'flex',
  flexDirection: 'column',
  color: '#FFFFFF',
});

const CollectionDescripTitle = styled('div')({
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  marginTop: '2px',
  marginBottom: '2px',
});

const CollectionDescripText = styled('div')({
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '20px',
  lineHeight: '24px',
  marginTop: '2px',
  marginBottom: '20px',
  whiteSpace: 'pre-line',
});

const collectionsDisplay = props => {
  const {collections, fetchAllCollections} = props;
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  
  useEffect(() => {
    fetchAllCollections();
  }, []);

  const [collection, setCollection] = useState(DEFAULT_COLLECTION)

  const collectionDescription = getCollectionDescription(collection, collections);

  const handleButtonEnter = collectionName => {
    setCollection(collectionName);
  };

  return (
    <div>
        <DisplayItem text={collectionDescription.title}
                     component={CollectionTitle} />
        <DisplayItems
          items={[
            {title: 'Artist', text: collectionDescription.artist},
            {title: 'Description', text: collectionDescription.description},
            {title: 'Date', text: collectionDescription.date},
          ]}
          component={CollectionDescrip}
          titleComponent={CollectionDescripTitle}
          textComponent={CollectionDescripText}
        />
      { collectionDescription.url &&
      <Link key={'collect_' + collection}
            to={{
              search: '?collection=' + collection + '&ensemble=' + DEFAULT_ENSEMBLE,
              state: {showCollection: false},
            }}>
        <Player
             alt={collectionDescription.poster}
             src={collectionDescription.poster} />
      </Link>}
      <PreviewStrip>
        <CollectionPicker
          collections={collections}
          onButtonEnter={handleButtonEnter}/>
      </PreviewStrip>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const collectionsState = state.collections || {};
  return {
    collections: getDataArray(collectionsState),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllCollections: () => dispatch(fetchResource('collections')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(collectionsDisplay);
