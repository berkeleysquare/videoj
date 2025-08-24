import React from 'react';
import {connect} from "react-redux";
import {useNavigate, useLocation, useParams, Link} from 'react-router-dom';
import ImageButton from './image_button';
import {DEFAULT_ENSEMBLE, DEFAULT_COLLECTION} from '../constants'

export const getCollectionDescription = (collection, collections) => {
  const filteredImages = collections.filter(i => i.collection === collection);
  if (filteredImages && filteredImages.length) {
    return filteredImages[0];
  }
  return {};
}

const collectionPicker = props => {
  const {collections, onButtonEnter, fetchAllCollections} = props;
  
  // React Router hooks replace withRouter
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // all collections except "home"
  const buttons = collections.filter(c => c.width && c.collection !== 'home');

  return (
    <div>
      {buttons.map(image => {
        return (
          <Link key={'collect_' + image.collection}
                to={{
                  search: '?collection=' + image.collection + '&ensemble=' + DEFAULT_ENSEMBLE,
                  state: {showCollection: false},
          }}>
            <ImageButton image={image}
                         onButtonEnter={onButtonEnter.bind(null, image.collection)}  />
          </Link>
      )})}
    </div>
  );
};

const mapStateToProps = (_, ownProps) => {
  const ensemble = ownProps.ensemble || DEFAULT_ENSEMBLE;
  const collection = ownProps.collection || DEFAULT_COLLECTION;
  const collectionEnsembles = ownProps.ensembles || [];
  const onButtonEnter = ownProps.onButtonEnter;
  const collections = ownProps.collections || [];

  return {
    collection,
    ensemble,
    collectionEnsembles,
    collections,
    onButtonEnter,
  };
};

export default connect(mapStateToProps)(collectionPicker);
