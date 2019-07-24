import React from 'react';
import {Provider} from 'react-redux';
import {Route, BrowserRouter} from 'react-router-dom';
import MainDisplay from './componenets/main_display';
import HeaderDisplay from './componenets/header';
import * as constants from './constants';
import configureStore from './store/store'

function App() {

  return (
    <Provider store={configureStore(configureStore({'resources': {}}))}>
      <HeaderDisplay title={constants.TITLE} imgSrc={constants.HEADER_IMAGE} linkTo={constants.HEADER_LINK} />
      <BrowserRouter basename='/'>
        <Route exact path='/' component={MainDisplay} />
        <Route exact path='/:collection' component={MainDisplay} />
        <Route path='/:collection/:ensemble' component={MainDisplay} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

