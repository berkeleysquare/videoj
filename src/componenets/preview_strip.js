import React from 'react';
import ImageButton from './image_button';

import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';

import UpIcon from '@material-ui/icons/ArrowBackIos';
import DownIcon from '@material-ui/icons/ArrowForwardIos'
import Tooltip from '@material-ui/core/Tooltip';

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

const showThisMany = 5;

const nowPlaying = title => {
  return {
    title,
    url: '/assets/NowPlaying.jpg',
  };
};


class previewStrip  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexOffset: 1,
    };
  };

  componentDidUpdate(prevProps) {
    const {id, items} = this.props;
    if (id && (prevProps.id !== id)) {
      this.setState({indexOffset: 1});
      return;
    }
    // any prop change, reset scroll buttons
    if (items && prevProps.items && (prevProps.items.length !== items.length)) {
      this.setState({indexOffset: 1});
    }
  }

  incrementIndex = () => {
    this.setIndexOffset(this.state.indexOffset + 1);
  };

  decrementIndex = () => {
    this.setIndexOffset(this.state.indexOffset - 1);
  };

  setIndexOffset = offset => {
    this.setState({indexOffset: offset});
  };

  render() {
    const {items, id, assets, classes} = this.props;
    const {indexOffset} = this.state;

    const videoCount = items.length;
    let currentVideoIndex = 0;
    for (var i = 0; i < videoCount; i++) {
      if (items[i] && items[i].id === id) {
        currentVideoIndex = i;
        break;
      }
    }
    const padSize = Math.floor(showThisMany / 2);
    const firstIndex = Math.max(0, currentVideoIndex - padSize + indexOffset);
    const lastIndex = Math.min(videoCount, firstIndex + showThisMany);
    const show = items.slice(firstIndex, lastIndex);

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
                onClick={this.decrementIndex}
                disabled={firstIndex <= 0}>
          {(firstIndex > 0) && <UpIcon />}
        </Button>
        {images.map(image => {
          return (<Link to={{search: 'id=' + image.id}}>
            <ImageButton image={image} nowPlaying={image.id === id}/>
          </Link>)
        })}
        {(lastIndex < videoCount) &&
          <Button className={classes.navButton} key="down" onClick={this.incrementIndex}>
            <DownIcon />
          </Button>}
      </div>
    );
  };
}
export default withStyles(styles)(previewStrip);

