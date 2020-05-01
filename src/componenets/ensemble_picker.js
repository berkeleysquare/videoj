import React from 'react';
import {connect} from "react-redux";
import {withRouter, Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import {DEFAULT_ENSEMBLE, DEFAULT_COLLECTION} from '../constants'

const styles = theme => ({
  ensemblePick: {
    marginLeft: '15px',
    marginRight: '15px',
    fontSize: '11;',
    width: '250px',
    color: '#ffffff',
  },
  ensembleButt: {
    fontSize: '11;',
    color: '#FFFFFF',
  },});

class ensemblePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null,
    };
  };

  handleChange = id => {
    this.setState({menu: null});
    this.props.history.push({pathname: '/collection/' + this.props.collection + '/' + id});

  }

  DEFAULT_ENSEMBLE_ITEM = (
    <Link to={'/collection/' + this.props.collection + '/' + DEFAULT_ENSEMBLE} key={DEFAULT_ENSEMBLE}>
      <MenuItem key={DEFAULT_ENSEMBLE} value={DEFAULT_ENSEMBLE}  onClick={this.handleChange.bind(this, DEFAULT_ENSEMBLE)}>All</MenuItem>
    </Link>);

  render() {
    const {collectionEnsembles, ensemble,  classes} = this.props;

    const toggleMenu = (e) => this.setState({menu: e.currentTarget});
    const closeMenu = () => this.setState({menu: null});

    const ensembles = collectionEnsembles
      ? collectionEnsembles.map(e => {
        return (<MenuItem key={'menu_' + e.id} onClick={this.handleChange.bind(this, e.id)} value={e.id}>{e.text}</MenuItem>)})
      : [];
    ensembles.push(this.DEFAULT_ENSEMBLE_ITEM);

    const ensembleName = (ensemble && collectionEnsembles && collectionEnsembles.length)
      ? (collectionEnsembles.filter(e => e.id === ensemble)[0] || {text: DEFAULT_ENSEMBLE}).text
      : DEFAULT_ENSEMBLE;

    return (
      <div className={classes.ensemblePick}>
        <Button aria-controls="enseble-menu" aria-haspopup="true" onClick={toggleMenu}>
          <span className={classes.ensembleButt}>{ensembleName}</span>
        </Button>
        <Menu id="enseble-menu"
              anchorEl={this.state.menu}
              open={Boolean(this.state.menu)}
              onClose={closeMenu}>
          {ensembles}
        </Menu>
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
