import React from 'react';
import MainDisplay from './componenets/main_display';
import HeaderDisplay from './componenets/header';
import * as constants from './constants';


function App() {
  return (
    <div>
      <HeaderDisplay title={constants.TITLE} imgSrc={constants.HEADER_IMAGE} linkTo={constants.HEADER_LINK} />
      <MainDisplay
        title={"Ain't Misbehavin"}
        description={"Was that a good time or what? Kurt O is back in the LiveAtTheCoffehouse.com 'A' Studios."}
        src={"https://liveatthecoffeehouse.s3-us-west-2.amazonaws.com/www/media/AintMisbehavin.mp4"}
        composer={"Fats Waller"}
        copyright={1929}/>
    </div>
  );
};

export default App;
