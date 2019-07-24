import React from 'react';
import ImageButton from './image_button';

import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';

import Hidden from '@material-ui/core/Hidden';
import NextIcon from '@material-ui/icons/ArrowForwardRounded';
import PrevIcon from '@material-ui/icons/ArrowBackRounded'
import Tooltip from '@material-ui/core/Tooltip';

export const NEXT = 'Next;'
export const PREV = 'Prev';

const styles = theme => ({
  panel: {
    marginRight: '10px',
    backgroundColor: '#eadbc5',
    minHeight: '100px'
  },
  button: {
    background: '#93887a',
    width: '50px',
    height: '90px',
    color: '#eee',
    marginRight: '10px',
    backgroundColor: '#93887a',
    '&:hover': {
      backgroundColor: '#ddd',
    }
  }
});

const prevNextButton = props => {
  const {item, type, classes} = props;
  const {title, poster, id, ensemble} = item;
  const isPrev = type === PREV;

  const image = {
    url: '/assets/' + poster,
    title,
    width: '160px',
  }
 ;
  return (
    <div className={classes.panel}>
      {id && <Tooltip title={type + ': ' + title}>
        <Link to={{search: 'id=' + id}}>
          <table border="0"><tbody><tr>
            {isPrev && <td>
              <Button aria-label={type} className={classes.button}>
                <PrevIcon/>
              </Button>
            </td>}
            <td>
              <Hidden smDown implementation='css'>
                <ImageButton image={image}/>
              </Hidden>
            </td>
            {!isPrev && <td>
              <Button aria-label={type} className={classes.button}>
                  <NextIcon/>
                </Button>
            </td>}
          </tr>
          <tr>
            <td colSpan={2}>
              <Hidden smDown implementation='css'>
                <h5>{ensemble}</h5>
              </Hidden>
              </td>
          </tr>
          </tbody></table>
        </Link>
      </Tooltip>}
    </div>
  );
};

export default withStyles(styles)(prevNextButton);

