import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from "@material-ui/icons/CancelOutlined";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  searchBar: {
    marginLeft: '5px',
    marginRight: '20px',
    fontSize: '11;',
    color: '#ffffff',
  },
  searchText: {
    fontSize: '11;',
    color: '#FFFFFF',
  },
});


class searcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null
    };
  };

  render() {
    const {searchText, onChange, onClear, classes} = this.props;

    return (
      <div className={classes.searchBar}>
        <SearchIcon/>
        <TextField id="search-collection"
                   name="searchtext"
                   value={searchText}
                   InputProps={{
                     className: classes.searchText,
                   }}
                   onChange={onChange}
        />
        <Button aria-controls="Search" onClick={onClear}>
          <CancelIcon className={classes.searchText}/>
        </Button>
      </div>
    );
  };
};

export default withStyles(styles)(searcher);
