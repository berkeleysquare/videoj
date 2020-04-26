import React from 'react';
import {Provider} from 'react-redux';
import {Route, BrowserRouter} from 'react-router-dom';
import HomeDisplay from './componenets/home_display';
import CollectionsDisplay from './componenets/collections_display';
import MainDisplay from './componenets/main_display';
import HeaderDisplay from './componenets/header';
import * as constants from './constants';
import configureStore from './store/store'

function App() {

  return (
    <Provider store={configureStore(configureStore({'resources': {}}))}>
      <BrowserRouter basename='/'>
        <Route exact path='/' component={HomeDisplay} />
        <Route exact path='/albums' component={CollectionsDisplay} />
        <Route exact path='/collection/:collection' component={MainDisplay} />
        <Route exact path='/collection/:collection/:ensemble' component={MainDisplay} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

