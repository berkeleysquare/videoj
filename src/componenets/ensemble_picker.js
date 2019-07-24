import React from 'react';
import {connect} from "react-redux";
import {withRouter, Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import {DEFAULT_ENSEMBLE, DEFAULT_COLLECTION} from '../constants'

const styles = theme => ({
  titleContent: {
    marginRight: '15px',
    fontSize: '11;'
  }
});


class ensemblePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = id => {
    this.setState({open: false});
    this.props.history.push({pathname: '/' + this.props.collection + '/' + id});
  }

  DEFAULT_ENSEMBLE_ITEM = (
    <Link to={'/' + this.props.collection + '/' + DEFAULT_ENSEMBLE} key={DEFAULT_ENSEMBLE}>
      <MenuItem key={DEFAULT_ENSEMBLE} value={DEFAULT_ENSEMBLE}  onClick={this.handleChange.bind(this, DEFAULT_ENSEMBLE)}>All</MenuItem>
    </Link>);

  render() {
    const {collectionEnsembles, collection, ensemble,  classes} = this.props;

    const ensembles = collectionEnsembles
      ? collectionEnsembles.map(e => {
        return (<MenuItem key={'menu_' + e.id} onClick={this.handleChange.bind(this, e.id)} value={e.id}>{e.text}</MenuItem>)})
      : [];
    ensembles.push(this.DEFAULT_ENSEMBLE_ITEM);

    const ensembleName = (ensemble && collectionEnsembles && collectionEnsembles.length)
      ? (collectionEnsembles.filter(e => e.id === ensemble)[0] || {text: DEFAULT_ENSEMBLE}).text
      : DEFAULT_ENSEMBLE;

    return (
      <div>
        <Button aria-controls="enseble-menu" aria-haspopup="true" onClick={this.handleClickOpen}>
           {'Ensemble: ' + ensembleName}
        </Button>
        <Menu id="enseble-menu"
              open={this.state.open}
              onClose={this.handleClose}
              variant="contained"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              getContentAnchorEl={null}>{ensembles}</Menu>
      </div>
    );
  };
};

function mapStateToProps(state, ownProps) {
  const ensemble = ownProps.ensemble || DEFAULT_ENSEMBLE;
  const collection = ownProps.collection || DEFAULT_COLLECTION;
  const collectionEnsembles = ownProps.ensembles || [];

  return {
    history: ownProps.history,
    collection,
    ensemble,
    collectionEnsembles,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ensemblePicker)));
