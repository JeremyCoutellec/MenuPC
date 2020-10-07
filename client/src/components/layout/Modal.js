import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { removeModal } from '../../actions/modal';

const Modal = ({
  modal: { title, description, textCancel, textApprouve, redirection, open },
  history,
}) => {
  return (
    <Dialog open={open} onClose={removeModal}>
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={removeModal} color='primary'>
          {textCancel}
        </Button>
        <Button
          onClick={() => {
            removeModal();
            history.push(redirection);
          }}
          color='primary'
          autoFocus
        >
          {textApprouve}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Modal.propTypes = {
  modal: PropTypes.object.isRequired,
  removeModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modal: state.modal,
});
export default connect(mapStateToProps, { removeModal })(withRouter(Modal));
