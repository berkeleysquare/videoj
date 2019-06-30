import React from 'react';
import MainDisplay from './componenets/main_display';

function App() {
  return (
    <MainDisplay
      title={"Ain't Misbehavin"}
      description={"Was that a good time or what? Kurt O is back in the LiveAtTheCoffehouse.com 'A' Studios."}
      src={"https://liveatthecoffeehouse.s3-us-west-2.amazonaws.com/www/media/AintMisbehavin.mp4"}
      composer={"Fats Waller"}
      copyright={1929}/>
  );
};

export default App;
