import React, {useState, useEffect, useMemo} from 'react';
import {connect} from "react-redux";
import {useNavigate, useLocation, useParams, Link} from 'react-router-dom';
import { styled } from '@mui/material/styles';

import TitleBar from './title_bar';
import EnsembleSelect from './ensemble_picker';
import Searcher from './searcher';
import CollectionsDisplay from './collections_display';
import MainDisplay from './videos_display';

import {DEFAULT_COLLECTION} from '../constants'
import {fetchResource, isFetching, getDataArray} from '../store/actions'

// Returns a div with background image and gradient
const createBackgroundComponent = (imageUrl, gradient = null) => {
  const backgroundImage = gradient 
    ? `${gradient}, url(${imageUrl})`
    : `url(${imageUrl})`;
    
  return styled('div')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage,
  });
};

export const DisplayItem = props => {
  const { text, component: Component = 'div', ...otherProps } = props;
  if (text && text.length) {
    return (
      <Component {...otherProps}>{text}</Component>
    );
  }
  return (<div></div>);
};

export const DisplayItems = props => {
  const { 
    items, 
    component: Component = 'div', 
    titleComponent: TitleComponent = 'p', 
    textComponent: TextComponent = 'p',
    ...otherProps 
  } = props;
  
  const children = [];
  items.forEach( (i, index) => {
    if (i.text && i.text.length) {
      children.push(<TitleComponent key={'title_' + i.title + index}>{i.title}</TitleComponent>);
      children.push(<TextComponent key={'text_' + i.title + index}>{i.text}</TextComponent>);
    }
  });
  return(
    <Component {...otherProps}>
      {children}
    </Component>
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
    collectionObject,
    collectionTitle,
  } = props;

  // React Router hooks replace withRouter
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    collection && (collection !== DEFAULT_COLLECTION) &&fetchItems(collection);
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

  // Background component selection based on collection - memoized to prevent re-renders
  const BackgroundComponent = useMemo(() => {
    const imageUrl = collectionObject?.poster || '/assets/blank_back.jpg';
    const gradient = collectionObject?.backgroundGradient || 'linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .2))';

    return createBackgroundComponent(imageUrl, gradient);
  }, [collectionObject?.poster, collectionObject?.backgroundGradient]);
  console.log('Render display page with BackgroundComponent');

  const ensembleControl = (!fetching && collection) ?
    (
      <EnsembleSelect ensembles={collectionEnsembles || []}
                      ensemble={ensemble}
                      collection={collection}
                      collectionTitle={collectionTitle}
                      onChange={clearSearchText} />
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
    <BackgroundComponent>
      <TitleBar ensembleControl={ensembleControl}
                searchControl={searchControl}/>
      {collection === DEFAULT_COLLECTION && <CollectionsDisplay />}
      {collection !== DEFAULT_COLLECTION && <MainDisplay collection={collection}
                                  ensemble={ensemble}
                                  searchText={searchText}/>}
    </BackgroundComponent>
  );
};

function mapStateToProps(state, ownProps) {
  // Use location from ownProps (passed by connect) 
  const location = ownProps.location;
  const params = new URLSearchParams(location?.search || '');
  const id = params.get('id') || '0';
  const collection = params.get('collection') || DEFAULT_COLLECTION;
  const ensemble = params.get('ensemble') || null;
  const videosState = state[collection] || {};
  const collectionsState = state.collections || {};
  const collections = getDataArray(collectionsState);


  return {
    id: parseInt(id),
    collection,
    collectionObject: collections.find(c => c.collection === collection) || {},
    ensemble,
    collectionEnsembles: videosState.ensembles || [],
    collectionTitle: videosState.title || '',
    fetching: isFetching([videosState, collectionsState])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchItems: collection => dispatch(fetchResource(collection)),
  };
}

// Component that uses hooks to get location and passes it to connected component
const DisplayPageWithLocation = (props) => {
  const location = useLocation();
  const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(mainDisplay);
  return <ConnectedComponent {...props} location={location} />;
};

export default DisplayPageWithLocation;
