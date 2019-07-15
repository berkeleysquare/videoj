import React from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import {MAIN_WIDTH} from '../constants';

const styles = theme => ({
  headerBar: {
    elevation: 2,
    width: MAIN_WIDTH,
    height: '40px'
  },
  headerImg: {
    width: MAIN_WIDTH,
    height: '40px'
  },
});

const header = props => {
  const {title, imgSrc, linkTo, classes} = props;

  return (
    <Paper className={classes.headerBar}>
      <a href={linkTo}>
        <img className={classes.headerImg} src={imgSrc} alt={title} />
      </a>
    </Paper>
  );
};

export default withStyles(styles)(header);
