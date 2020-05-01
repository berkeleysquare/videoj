import React from 'react';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import TitleBar from './title_bar';

const styles = theme => ({
  root: {
    backgroundColor: '#110f34',
  },
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

export const DEFAULT_ID = 1000;

class homeDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  };

  handleSearchTextChange = event => {
    this.setState({searchText: event.target.value});
  };

  clearSearchText = () => {
    this.setState({searchText: ''});
  };

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
