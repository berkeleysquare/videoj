import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import NextIcon from '@material-ui/icons/ArrowForwardRounded';
import PrevIcon from '@material-ui/icons/ArrowBackRounded'
import Tooltip from '@material-ui/core/Tooltip';

export const NEXT = 'Next;'
export const PREV = 'Prev';

const styles = theme => ({
  image: {
    elevation: 2,
    width: '180px',
    height: '120px',
    align: 'right',
  },
  button: {
    background: '#93887a',
    width: '60px',
    height: '120px',
    color: '#eee',
    backgroundColor: '#93887a',
    '&:hover': {
      backgroundColor: '#ddd',
    }
  }
});

const prevNextButton = props => {
  const {title, type, imgSrc, classes} = props;

  return (
    <Tooltip title={type + ': ' + title}>
      <Grid container>
        <Grid item xs={12} sm={12} md={9}>
          <Hidden smDown implementation='css'>
            <img className={classes.image} src={imgSrc} alt={type} />
            <h3>{title}</h3>
          </Hidden>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Button aria-label={type} className={classes.button}>
              {type === PREV ? <PrevIcon/> : <NextIcon/>}
            </Button>
        </Grid>
      </Grid>
    </Tooltip>
  );
};


export default withStyles(styles)(prevNextButton);

