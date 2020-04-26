import React from 'react';
import {connect} from "react-redux";
import {withRouter, Link} from 'react-router-dom';
import ImageButton from './image_button';
import {DEFAULT_ENSEMBLE, DEFAULT_COLLECTION} from '../constants'

const images = [
  {
    url: '/assets/jkha.png',
    title: 'Halfway Gone',
    collection: 'halfwaygone',
    width: '17%',
  },
  {
    url: '/assets/jkev.png',
    title: 'jk Even Numbered Decades',
    collection: 'jk_even',
    width: '16%',
  },
  {
    url: '/assets/errand.png',
    title: 'Errand Boys for Rhythm',
    collection: 'errand',
    width: '17%',
  },
  {
    url: '/assets/berk1.png',
    title: 'Berkeley Square',
    collection: 'bksq1',
    width: '17%',
  },
  {
    url: '/assets/berk2.png',
    title: 'A Nightingale Sang',
    collection: 'bksq2',
    width: '16%',
  },
  {
    url: '/assets/coffee.png',
    title: 'The Coffeehouse',
    collection: 'coffeehouse',
    width: '16%',
  },
];

class collectionPicker extends React.Component {

  render() {
    const {collectionEnsembles, collection, ensemble, classes} = this.props;

    return (
      <div>
        {images.map(image => {
          return (
            <Link to={'/collection/' + image.collection + '/' + DEFAULT_ENSEMBLE} key={'collect_' + image.collection}>
              <ImageButton image={image}/>
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

  return {
    history: ownProps.history,
    collection,
    ensemble,
    collectionEnsembles,
  };
}

export default withRouter(connect(mapStateToProps)(collectionPicker));
