import React from 'react';
import {connect} from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import {withStyles} from '@material-ui/core/styles';
import PrevNextButton from './prev_next_button'

const styles = theme => ({
  titleContent: {
    marginRight: '15px',
    fontSize: '11;'
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
    const {items, searchText, onChange, classes} = this.props;

    const toggleMenu = (e) => this.setState({menu: e.currentTarget});
    const closeMenu = () => this.setState({menu: null});

    const matches = (items || []).map(e => {
        return (<PrevNextButton key={'menu_' + e.id} item={e} type="None" />)
    });

    return (
      <div>
        <Button aria-controls="enseble-menu" aria-haspopup="true" onClick={toggleMenu}>
           <SearchIcon/>
        </Button>
        <TextField id="search-collection"
                   name="searchtext"
                   value={searchText}
                   onChange={onChange}
        />
        <Menu id="enseble-menu"
              anchorEl={this.state.menu}
              open={Boolean(this.state.menu)}
              onClose={closeMenu}>
          {matches}
         </Menu>
      </div>
    );
  };
};

function mapStateToProps(state, ownProps) {
  const items = ownProps.items || [];
  const searchText = ownProps.searchText;

  return {
    searchText,
    items,
    onChange: ownProps.onChange,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(searcher));
