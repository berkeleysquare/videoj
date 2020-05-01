import React from 'react';
import {connect} from "react-redux";
import {withRouter, Link} from 'react-router-dom';
import ImageButton from './image_button';
import {DEFAULT_ENSEMBLE, DEFAULT_COLLECTION} from '../constants'

const images = [
  {
    url: '/assets/jkha.png',
    poster: '/assets/poster_halfgone.jpg',
    title: 'Halfway Gone',
    artist: 'jk & friends',
    date: 'Released May 1982',
    description: "Released on Vinyl, before it was retro chic!",
    collection: 'halfwaygone',
    width: '17%',
  },
  {
    url: '/assets/jkev.png',
    poster: '/assets/poster_jkeven.jpg',
    title: 'jk Even Numbered Decades',
    artist: 'jk',
    date: '1984-1996',
    description: "Misc live recordings and demos",
    collection: 'jk_even',
    width: '16%',
  },
  {
    url: '/assets/errand.png',
    poster: '/assets/poster_eb.jpg',
    title: 'Errand Boys for Rhythm',
    artist: 'Errand Boys for Ryhthm',
    date: '1996-1998',
    description: "jk & Bobby",
    collection: 'errand',
    width: '17%',
  },
  {
    url: '/assets/berk1.png',
    poster: '/assets/poster_bksq.jpg',
    title: 'Berkeley Square',
    artist: 'Berkeley Square',
    date: 'Released 1998',
    description: "jk, Brian, Brooke, and Gary",
    collection: 'bksq1',
    width: '17%',
  },
  {
    url: '/assets/berk2.png',
    poster: '/assets/poster_bksq2.jpg',
    title: 'A Nightingale Sang',
    artist: 'Berkeley Square',
    date: 'Released 2001',
    description: "Kurt, jk, Brian, Brooke, and Gary",
    collection: 'bksq2',
    width: '16%',
  },
  {
    url: '/assets/coffee.png',
    poster: '/assets/coffeehouse.jpg',
    title: 'The Coffeehouse',
    artist: 'jk & freinds',
    date: '2009-present',
    description: "Live performances from The Coffeehouse 'A' Studios",
    collection: 'coffeehouse',
    width: '16%',
  },
];

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
