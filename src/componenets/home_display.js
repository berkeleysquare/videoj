import React from 'react';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import TitleBar from './title_bar';

const styles = theme => ({
  homeImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    backgroundImage: `url(/assets/jkboxed_home.jpg)`,
  },
});

class homeDisplay extends React.Component {

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.homeImage}>
        <TitleBar />
      </div>
    );
  };
};

export default withRouter(withStyles(styles)(homeDisplay));
