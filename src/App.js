import React from 'react';
import {Provider} from 'react-redux';
import {Route, BrowserRouter} from 'react-router-dom';
import HomeDisplay from './componenets/display_page';
import configureStore from './store/store'

function App() {

  return (
    <Provider store={configureStore(configureStore({'resources': {}}))}>
      <BrowserRouter basename='/'>
        <Route path='/' component={HomeDisplay} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

