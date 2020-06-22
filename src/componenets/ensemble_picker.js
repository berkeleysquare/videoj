import React, {useState} from 'react';
import {connect} from "react-redux";
import {withRouter, Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import {DEFAULT_ENSEMBLE, DEFAULT_COLLECTION} from '../constants'

const styles = theme => ({
  ensemblePick: {
    marginLeft: '10px',
    marginRight: '10px',
    fontSize: '11;',
    color: '#ffffff',
  },
  ensembleButt: {
    fontSize: '11;',
    color: '#FFFFFF',
  },});

const ensemblePicker = props => {
  const {onChange, history, collection, collectionTitle, collectionEnsembles, ensemble, classes} = props;
  const [menu, setMenu] = useState(null);

  const handleChange = id => {
    setMenu(null);
    history.push({search: '?collection=' + collection + '&ensemble=' + id});
    onChange && onChange(id);
  };

  const DEFAULT_ENSEMBLE_ITEM = (
    <Link to={{search: '?collection=' + collection + '&ensemble=' + DEFAULT_ENSEMBLE}} key={DEFAULT_ENSEMBLE}>
      <MenuItem key={DEFAULT_ENSEMBLE} value={DEFAULT_ENSEMBLE}  onClick={handleChange.bind(null, DEFAULT_ENSEMBLE)}>All</MenuItem>
    </Link>);


  const toggleMenu = (e) => setMenu(e.currentTarget);
  const closeMenu = () => setMenu(null);

  const ensembles = collectionEnsembles
    ? collectionEnsembles.map(e => {
      return (<MenuItem key={'menu_' + e.id} onClick={handleChange.bind(null, e.id)} value={e.id}>{e.text}</MenuItem>)})
    : [];
  ensembles.push(DEFAULT_ENSEMBLE_ITEM);

  const ensembleName = (ensemble && collectionEnsembles && collectionEnsembles.length)
    ? (collectionEnsembles.filter(e => e.id === ensemble)[0] || {text: DEFAULT_ENSEMBLE}).text
    : DEFAULT_ENSEMBLE;

  return (
    <div className={classes.ensemblePick}>
      <Button aria-controls="enseble-menu" aria-haspopup="true" onClick={toggleMenu}>
        <span className={classes.ensembleButt}>{collectionTitle + ': ' + ensembleName}</span>
      </Button>
      <Menu id="enseble-menu"
            anchorEl={menu}
            open={Boolean(menu)}
            onClose={closeMenu}>
        {ensembles}
      </Menu>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  const ensemble = ownProps.ensemble || DEFAULT_ENSEMBLE;
  const collection = ownProps.collection || DEFAULT_COLLECTION;
  const collectionTitle = ownProps.collectionTitle || DEFAULT_COLLECTION;
  const collectionEnsembles = ownProps.ensembles || [];

  return {
    history: ownProps.history,
    collection,
    collectionTitle,
    ensemble,
    collectionEnsembles,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ensemblePicker)));
