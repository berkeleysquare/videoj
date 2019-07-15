import React from 'react';
import {Provider} from 'react-redux';
import MainDisplay from './componenets/main_display';
import HeaderDisplay from './componenets/header';
import * as constants from './constants';
import configureStore from './store/store'

function App() {


  return (
    <Provider store={configureStore(configureStore({'resources': {}}))}>
      <HeaderDisplay title={constants.TITLE} imgSrc={constants.HEADER_IMAGE} linkTo={constants.HEADER_LINK} />
      <MainDisplay
        title={"Skylark"}
        collection={'jkboxed'} />
    </Provider>
  );
};

export default App;
