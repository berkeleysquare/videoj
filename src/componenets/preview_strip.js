import React from 'react';
import ImageButton from './image_button';

import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';

import UpIcon from '@material-ui/icons/ArrowUpwardRounded';
import DownIcon from '@material-ui/icons/ArrowDownwardRounded'
import Tooltip from '@material-ui/core/Tooltip';

export const NEXT = 'Next;'
export const PREV = 'Prev';

const styles = theme => ({
  panel: {
    marginRight: '10px',
    height: '100%',
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
  },
  navButton: {
    background: '#93887a',
    width: '200px',
    height: '30px',
    color: '#eee',
    marginRight: '2px',
    backgroundColor: '#93887a',
    '&:hover': {
      backgroundColor: '#ddd',
    }
  },
  nowPlaying: {
    backgroundImage: 'url("/assets/NowPlaying.jpg")',
    width: '200px',
    height: '60px',
    opacity: 0.9,
    '&:hover': {
      opacity: 1.0,
    }
  },

});

const showThisMany = 4;

class previewStrip  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexOffset: 0,
    };
  };

  componentDidUpdate(prevProps) {
    const {id} = this.props;
    if (id && (prevProps.id !== id)) {
      this.setState({indexOffset: 0});
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
    const firstIndex = Math.max(0, currentVideoIndex - 1 + indexOffset);
    const lastIndex = Math.min(videoCount - 1, currentVideoIndex + 2 + indexOffset);
    const show = items.slice(firstIndex, lastIndex);

    console.log('ist, last, count', firstIndex, lastIndex, videoCount)
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
        {(firstIndex > 0) &&
          <Button className={classes.navButton} key="up" onClick={this.decrementIndex}>
            <UpIcon />
          </Button>}
        {images.map(image => {
          return (image.id !== id)
            ? (<Link to={{search: 'id=' + image.id}}><ImageButton image={image}/></Link>)
            : (<div className={classes.nowPlaying}></div>)
        })}
        {(lastIndex < videoCount - 1) &&
          <Button className={classes.navButton} key="down" onClick={this.incrementIndex}>
            <DownIcon />
          </Button>}
      </div>
    );
  };
}
export default withStyles(styles)(previewStrip);

