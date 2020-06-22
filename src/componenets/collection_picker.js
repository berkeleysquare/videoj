import React from 'react';
import {connect} from "react-redux";
import {withRouter, Link} from 'react-router-dom';
import ImageButton from './image_button';
import {COLLECTIONS as images, DEFAULT_ENSEMBLE, DEFAULT_COLLECTION} from '../constants'

export const getCollectionDescription = collection => {
  const filteredImages = images.filter(i => i.collection === collection);
  if (filteredImages && filteredImages.length) {
    return filteredImages[0];
  }
  return {};
}

const collectionPicker = props => {
  const {onButtonEnter} = props;

  return (
    <div>
      {images.map(image => {
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

function mapStateToProps(state, ownProps) {
  const ensemble = ownProps.ensemble || DEFAULT_ENSEMBLE;
  const collection = ownProps.collection || DEFAULT_COLLECTION;
  const collectionEnsembles = ownProps.ensembles || [];
  const onButtonEnter = ownProps.onButtonEnter;

  return {
    history: ownProps.history,
    collection,
    ensemble,
    collectionEnsembles,
    onButtonEnter,
  };
}

export default withRouter(connect(mapStateToProps)(collectionPicker));
