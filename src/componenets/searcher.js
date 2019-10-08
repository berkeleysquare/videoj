import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from "@material-ui/icons/CancelOutlined";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  searchBar: {
    marginLeft: '15px',
    marginRight: '15px',
    fontSize: '11;',
    width: '100%',
  }
});


class searcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null
    };
  };

  render() {
    const {items, searchText, onChange, onClear, classes} = this.props;

    return (
      <div className={classes.searchBar}>
        <SearchIcon/>
        {'Search by Title: '}
        <TextField id="search-collection"
                   name="searchtext"
                   value={searchText}
                   onChange={onChange}
        />
        <Button aria-controls="Search" onClick={onClear}>
          <CancelIcon/>
        </Button>
      </div>
    );
  };
};

export default withStyles(styles)(searcher);
