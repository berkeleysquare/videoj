import  React from 'react';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 120,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    transition: 'all 500ms',
    transform: `scale(1.25) !important`,
    '& .imageBackdrop': {
      opacity: 0.15,
    },
    '& .imageMarked': {
      opacity: 0,
    },
    '& .imageTitle': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.1,
  transition: theme.transitions.create('opacity'),
}));

const ImageButton = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageTitle = styled(Typography)({
  position: 'relative',
  padding: `10px 10px 15px`,
});

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const imageButton = props => {
  const {image, onButtonEnter, nowPlaying} = props;
  
  // React Router hooks replace withRouter - only use if in router context
  let navigate, location, params;
  try {
    navigate = useNavigate();
    location = useLocation();
    params = useParams();
  } catch (error) {
    // Not in router context, hooks will be undefined
    navigate = location = params = undefined;
  }

  return (
    <StyledButtonBase
      focusRipple
      key={image.title}
      onMouseEnter={onButtonEnter}
      style={{
        width: image.width,
      }}
    >
      <ImageSrc
        style={{
          backgroundImage: `url(${image.url})`,
        }}
      />
      <ImageBackdrop className="imageBackdrop" />
      <ImageButton className="imageButton">
        <ImageTitle
          component="span"
          variant="subtitle1"
          color="inherit"
          className="imageTitle"
        >
          {nowPlaying ? 'NOW PLAYING' : image.title}
          <ImageMarked className="imageMarked" />
        </ImageTitle>
      </ImageButton>
    </StyledButtonBase>
  );
}

export default imageButton;


