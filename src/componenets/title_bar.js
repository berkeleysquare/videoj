import React from 'react';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  titleBar: {
    marginTop: '6px',
    marginBottom: '6px',
    backgroundColor: 'rgba(90, 33, 211, 0.6)',
    minHeight: '44px',
  },
  titleContent: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  menuButtons: {
    position: 'absolute',
    top: 1,
    left: 190,
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'flex-end',
  },
  menuButton: {
    backgroundColor: 'rgba(90, 33, 211, 0.6)',
    fontSize: '14px',
    color: '#FFFFFF',
  },
});

const titleBar = props => {

  const {classes, ensembleControl, searchControl} = props;

  return (
    <div className={classes.titleBar}>
      <span
        className={classes.titleContent}
        style={{
          backgroundImage: `url(/assets/logo.jpg)`,
          width: 110,
          height: 34,
        }}
      />
      <div className={classes.menuButtons}>
        <Link to={'/'}><Button className={classes.menuButton}>Home</Button></Link>
        <Link to={{pathname: '/', state: {showCollection: true}}}><Button className={classes.menuButton}>Collections</Button></Link>
        {ensembleControl}
        {searchControl}
      </div>

    </div>
  );
};

export default withStyles(styles)(titleBar);
