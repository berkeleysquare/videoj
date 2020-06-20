import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import TitleBar from './title_bar';
import EnsembleSelect from './ensemble_picker';
import Searcher from './searcher';
import CollectionsDisplay from './collections_display';
import MainDisplay from './videos_display';
import {withStyles} from '@material-ui/core/styles';

import * as buttons from '../constants'
import {fetchResource, isFetching, getDataArray} from '../store/actions'

const styles = theme => ({
  backHome: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: `url(/assets/jkboxed_home.jpg)`,
  },
  back: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .2)), url(/assets/blank_back.jpg)',
  },
  backHalfgone: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .9)), url(/assets/poster_halfgone.jpg)',
  },
  backJkeven: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .9)), url(/assets/poster_jkeven.jpg)',
  },
  backErrand: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .9)), url(/assets/poster_eb.jpg)',
  },
  backBksq1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .8)), url(/assets/poster_bksq.jpg)',
  },
  backBksq2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .9), rgba(0, 0, 0, .8)), url(/assets/poster_bksq2.jpg)',
  },
  backCoffeehouse: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .9)), url(/assets/coffeehouse.jpg)',
  },
  ensemblePick: {
    position: 'absolute',
    width: '150px',
    height: '480px',
    right: '20px',
    top: '115px',
  },
});

export const DisplayItem = props => {
  if (props.text && props.text.length) {
    return (
      <div className={props.className}>{props.text}</div>
    );
  }
  return (<div></div>);
};

export const DisplayItems = props => {
  const children = [];
  props.items.forEach( (i, index) => {
    if (i.text && i.text.length) {
      children.push(<p className={props.classTitle} key={'title_' + i.title + index}>{i.title}</p>);
      children.push(<p className={props.classText} key={'text_' + i.title + index}>{i.text}</p>);
    }
  });
  return(
    <div className={props.className}>
      {children}
    </div>
  );
};


const mainDisplay = props => {
  const {
    fetchItems,
    fetching,
    collectionAssets,
    collectionEnsembles,
    videos,
    id,
    ensemble,
    collection,
    collectionTitle,
    showCollection,
    classes
  } = props;

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    collection && fetchItems(collection);
    setSearchText('');
    },[collection],
  );

  const handleSearchTextChange = event => {
    setSearchText(event.target.value);
  };

  const clearSearchText = () => {
    setSearchText('');
  };


  const filteredEnsemble = (ensemble === 'all')
    ? videos
    : ((!fetching && videos) ? videos.filter(v => v.ensemble === ensemble) : []);
  const filtered = filteredEnsemble
    ? filteredEnsemble.filter(i => i.title.toLowerCase().startsWith(searchText.toLowerCase()))
    : [] ;

  let background = showCollection ? 'back' : 'backHome';
  if (collection) {
    switch (collection) {
      case 'halfwaygone':
        background = 'backHalfgone';
        break;
      case 'jk_even':
        background = 'backJkeven';
        break;
      case 'bksq1':
        background = 'backBksq1';
        break;
      case 'bksq2':
        background = 'backBksq2';
        break;
      case 'errand':
        background = 'backErrand';
        break;
      case 'coffeehouse':
        background = 'backCoffeehouse';
        break;
      default:
        background = 'back';
        break;
    }
  }

  const ensembleControl = (!fetching && collection) ?
    (
      <EnsembleSelect ensembles={collectionEnsembles || []}
                      ensemble={ensemble}
                      collection={collection}
                      collectionTitle={collectionTitle}/>
    )
    : (<div></div>);

  const searchControl = (!fetching && collection) ?
    (
      <Searcher items={filtered}
                searchText={searchText}
                onChange={handleSearchTextChange}
                onClear={clearSearchText} />
    )
    : (<div></div>);

  return (
    <div className={classes[background]}>
      <TitleBar ensembleControl={ensembleControl}
                searchControl={searchControl}/>
      {showCollection && <CollectionsDisplay />}
      {collection && <MainDisplay collection={collection}
                                  ensemble={ensemble}
                                  searchText={searchText}/>}
    </div>

  );
};

function mapStateToProps(state, ownProps) {
  const params = new URLSearchParams(ownProps.location.search);
  const id = params.get('id') || '0';
  const collection = params.get('collection') || null;
  const ensemble = params.get('ensemble') || null;
  const videosState = state[collection] || {};
  const showCollection = (ownProps.location != null) &&  (ownProps.location.state != null) && (ownProps.location.state.showCollection === true);

  return {
    id: parseInt(id),
    collection,
    ensemble,
    collectionEnsembles: videosState.ensembles || [],
    showCollection,
    collectionTitle: videosState.title || '',
    fetching: isFetching([videosState])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchItems: collection => dispatch(fetchResource(collection)),
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(mainDisplay)));
