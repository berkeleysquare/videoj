import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';


const mainDisplay = props => {
  const {title, description, src, composer, copyright} = props;

  return (
    <div>
      <h2>{title}</h2>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <p>{description}</p>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <video width="450" height="338"
                 controls
                 src={src}
                 type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Hidden smDown implementation='css'>
            <h3>Some Stuff...</h3>
            <img src="/assets/cork.jpg" width="180px" height="120px" />
            <h3>More Stuff</h3>
            <img src="/assets/cork.jpg" width="180px" height="120px" />
          </Hidden>
          <Hidden only={['xs','md','lg','xl']} implementation='css'>
            <p>Stuff...</p>
            <img src="/assets/cork.jpg" width="80px" height="120px" />
            <p>More</p>
            <img src="/assets/cork.jpg" width="80px" height="120px" />
          </Hidden>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
           <p>{composer + (copyright ? (' ©' + copyright) : '')}</p>
        </Grid>
      </Grid>
    </div>
  );
};


export default mainDisplay;
