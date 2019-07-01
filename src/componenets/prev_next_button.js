import React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import NextIcon from '@material-ui/icons/ArrowForwardRounded';
import PrevIcon from '@material-ui/icons/ArrowBackRounded'
import Tooltip from '@material-ui/core/Tooltip';

export const NEXT = 'Next;'
export const PREV = 'Prev';

const styles = theme => ({
  panel: {
    marginRight: '10px',
    backgroundColor: '#eadbc5'
  },
  image: {
    elevation: 2,
    width: '180px',
    height: '120px',
    align: 'center',
  },
  button: {
    background: '#93887a',
    width: '60px',
    height: '120px',
    color: '#eee',
    marginRight: '10px',
    backgroundColor: '#93887a',
    '&:hover': {
      backgroundColor: '#ddd',
    }
  }
});

const prevNextButton = props => {
  const {title, type, imgSrc, classes} = props;

  return (
    <div className={classes.panel}>
      <Tooltip title={type + ': ' + title}>
        <table border="0"><tbody> <tr>
          <td>
            <Hidden smDown implementation='css'>
              <img className={classes.image} src={imgSrc} alt={type} />
            </Hidden>
          </td>
          <td>
            <Button aria-label={type} className={classes.button}>
                {type === PREV ? <PrevIcon/> : <NextIcon/>}
              </Button>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Hidden smDown implementation='css'>
              <h3>{title}</h3>
            </Hidden>
            </td>
        </tr>
        </tbody></table>
      </Tooltip>
    </div>
  );
};

export default withStyles(styles)(prevNextButton);

