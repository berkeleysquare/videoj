import React from 'react';
import Grid from '@material-ui/core/Grid';
import PrevNext, {PREV, NEXT} from './prev_next_button';
import {MAIN_WIDTH} from '../constants';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  video: {
    elevation: 2,
    width: MAIN_WIDTH,
    height: '500px',
    position: 'absolute',
    top: '80px'
  },
  player: {
    marginLeft: '12px',
    width: '480px',
    height: '360px',
  },
  titleContent: {
    marginLeft: '12px',
  }
});

const mainDisplay = props => {
  const {title, description, src, composer, copyright, classes} = props;

  return (
    <div>
      <Paper className={classes.video}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} className={classes.titleContent}>
            <h1>{title}</h1>
            <p>{description}</p>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <video className={classes.player}
                   controls
                   poster="/assets/AngelEyes.jpg">
                   <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <PrevNext title={'Wave'}
                      imgSrc="/assets/Wave.jpg"
                      type={PREV} />
            <br />
            <PrevNext title={'Blues in the Night`'}
                      imgSrc="/assets/BluesInTheNight.jpg"
                      type={NEXT} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.titleContent}>
             <h2>{composer + (copyright ? (' ©' + copyright) : '')}</h2>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(mainDisplay);
