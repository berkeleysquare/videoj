import React from 'react';
import {Link} from 'react-router-dom';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Styled components replacing withStyles HOC
const TitleBarContainer = styled('div')({
  marginTop: '6px',
  marginBottom: '6px',
  backgroundColor: 'rgba(90, 33, 211, 0.6)',
  minHeight: '44px',
});

const TitleContent = styled('span')({
  position: 'absolute',
  top: '10px',
  left: 10,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const MenuButtons = styled('div')({
  position: 'absolute',
  top: '0px',
  left: 190,
  width: '100%',
  height: 50,
  display: 'flex',
  alignItems: 'flex-end',
});

const MenuButton = styled(Button)({
  backgroundColor: 'rgba(90, 33, 211, 0.6)',
  fontSize: '14px',
  color: '#FFFFFF',
});

const titleBar = props => {
  const {ensembleControl, searchControl} = props;

  return (
    <TitleBarContainer>
      <TitleContent
        style={{
          backgroundImage: `url(/src/assets/logo.jpg)`,
          width: 110,
          height: 34,
        }}
      />
      <MenuButtons>
        <Link to={'/'}><MenuButton>Home</MenuButton></Link>
        <Link to={{pathname: '/', state: {showCollection: true}}}><MenuButton>Collections</MenuButton></Link>
        {ensembleControl}
        {searchControl}
      </MenuButtons>
    </TitleBarContainer>
  );
};

export default titleBar;
