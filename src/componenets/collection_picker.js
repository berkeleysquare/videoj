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

class collectionPicker extends React.Component {

  render() {
    const {onButtonEnter} = this.props;

    return (
      <div>
        {images.map(image => {
          return (
            <Link to={'/collection/' + image.collection + '/' + DEFAULT_ENSEMBLE} key={'collect_' + image.collection}>
              <ImageButton image={image}
                           onButtonEnter={onButtonEnter.bind(null, image.collection)}  />
            </Link>
        )})}
      </div>
    );
  };
}

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
