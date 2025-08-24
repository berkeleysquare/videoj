import React from 'react';
import {Provider} from 'react-redux';
import {Route, BrowserRouter} from 'react-router-dom';
import HomeDisplay from './componenets/display_page.jsx';
import configureStore from './store/store'

function App() {

  return (
    <HomeDisplay />
  );
};

export default App;

