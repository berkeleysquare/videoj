import React, {useState, useEffect} from 'react';
import ImageButton from './image_button';

import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

import UpIcon from '@material-ui/icons/ArrowBackIos';
import DownIcon from '@material-ui/icons/ArrowForwardIos'

export const NEXT = 'Next';
export const PREV = 'Prev';

const styles = theme => ({
  panel: {
    marginRight: '10px',
    height: '120px',
    width: '100%',
    display: 'flex',
    flexDirection: 'flex-end',
  },
  navButton: {
    backgroundColor: 'rgba(90, 33, 211, 0.6)',
    width: '30px',
    height: '120px',
    color: '#eee',
    marginRight: '2px',
    opacity: 0.5,
    '&:hover': {
      opacity: 1.0,
    }
  },
  nowPlaying: {
    backgroundImage: 'url("/assets/NowPlaying.jpg")',
    width: '200px',
    height: '120px',
    opacity: 0.9,
    '&:hover': {
      opacity: 1.0,
    }
  },
});

// if there are enough to show: |L|**|R|R|R|
// else try to show all five
const showThisMany = 5;
const idealIndex = 1;

const previewStrip = props => {
  const {items, id, assets, collection, ensemble, classes} = props;
  const [indexOffset, setIndexOffset] = useState(0);

  useEffect(() => {
      setIndexOffset(0);
    },[id],
  );

  const incrementIndex = () => {
      setIndexOffset(indexOffset + 1);
  };

  const decrementIndex = () => {
    setIndexOffset(indexOffset - 1);
  };

  const videoCount = items.length;
  let currentVideoIndex = 0;
  for (var i = 0; i < videoCount; i++) {
    if (items[i] && items[i].id === id) {
      currentVideoIndex = i;
      break;
    }
  }
  currentVideoIndex += indexOffset;

  // layout "now playing" on strip based on availability
  // how many we got?
  let numRight = videoCount - currentVideoIndex;
  let numLeft =  currentVideoIndex;

  let leftIndex = currentVideoIndex;
  if (numLeft + numRight  < showThisMany) {
    // if there are not enough to scroll, show all
    leftIndex = 0;
  } else {
    // else fill the strip as best as we can
    // grab showThisMany - 1 neighbors
    for (var j = 1; j < showThisMany;) {
      if (numRight > 0) {
        // grab one from the right
        numRight--;
        j++;
      }
      if (numLeft > 0 && j < showThisMany) {
        // grab one from the left
        numLeft--;
        j++;
        // move it on over
        leftIndex--;
      }
    }
  }

  const rightIndex = Math.min(videoCount, leftIndex + showThisMany);
  const show = items.slice(leftIndex, rightIndex);

  const images = show.map(i => {
    return {
      id: i.id,
      url: assets + i.poster,
      title: i.title,
      width: '200px'
    }
  });

  return (
    <div className={classes.panel}>
      <Button className={classes.navButton}
              key="up"
              onClick={decrementIndex}
              disabled={leftIndex <= 0}>
        {(leftIndex > 0) && <UpIcon />}
      </Button>
      {images.map(image => {
        return (<Link key={'link_' + image.id} to={{search: '?collection=' + collection + '&ensemble=' + ensemble + '&id=' + image.id}}>
          <ImageButton image={image} nowPlaying={image.id === id}/>
        </Link>)
      })}
      {(rightIndex < videoCount) &&
        <Button className={classes.navButton} key="down" onClick={incrementIndex}>
          <DownIcon />
        </Button>}
    </div>
  );
};

export default withStyles(styles)(previewStrip);
