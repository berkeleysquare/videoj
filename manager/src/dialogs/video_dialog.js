import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import VideoForm from '../components/video_form';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const {initialValues, collections, ensembles, onCollectionChange, isDefault, setDefault, deleteItem, onSubmit} = props;

  const isEdit = true && initialValues && initialValues.title && initialValues.title.length;
  const buttonLabel = isEdit ? initialValues.title : 'New Video';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {buttonLabel}
      </Button>
      {isEdit && <Button title={'Edit'} onClick={handleClickOpen}>&#x270E;</Button>}
      {isEdit && <Button title={'Delete'} onClick={deleteItem}>&#x2718;</Button>}
      {isEdit && <Button title={'Set as default'} onClick={setDefault}>{isDefault ? <span>&#x2713;</span> : <span>&#x2610;</span>}</Button>}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{buttonLabel}</DialogTitle>
        <DialogContent>
          <VideoForm  initialValues={initialValues}
                      collections={collections}
                      ensembles={ensembles}
                      onCollectionChange={onCollectionChange}
                      onSubmit={onSubmit}
                      closeDialog={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
