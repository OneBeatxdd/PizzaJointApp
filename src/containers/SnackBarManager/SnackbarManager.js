import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { isEmptyObj } from '../../utils/isEmptyObj';
import Alert from '@material-ui/lab/Alert';

class SnackbarManager extends Component {
  queue = [];

  state = {
    open: false,
    currentSnackbar: {},
  };

  componentDidUpdate = () => {
    if (this.props.snackbarQueue.length > 0) {
      this.enqueue(this.props.snackbarQueue[0]);
      this.props.dequeueSnackbar();
    }
  };

  enqueue = (snackbar) => {
    this.queue.push({
      ...snackbar,
      key: new Date().getTime(),
    });
    this.processQueue();
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        currentSnackbar: this.queue.shift(),
        open: true,
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { currentSnackbar } = this.state;
    const { message, severity, anchorOrigin, extraAction } = currentSnackbar;
    return (
      <Snackbar
        key={currentSnackbar.key}
        anchorOrigin={
          !isEmptyObj(anchorOrigin)
            ? anchorOrigin
            : {
                vertical: 'bottom',
                horizontal: 'right',
              }
        }
        open={this.state.open}
        autoHideDuration={1000}
      >
        <Alert severity={severity ? severity : 'info'} onClose={this.handleClose}>
          <span id="snackbar-message">{message}</span>
        </Alert>
      </Snackbar>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    snackbarQueue: state.system.snackbarQueue,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    dequeueSnackbar: () =>
      dispatch({
        type: 'DEQUEUE_SNACKBAR',
        payload: {},
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarManager);

export const withSnackbar = (component) => {
  return connect(null, (dispatch) => {
    return {
      makeSnackbar: (message, anchorOrigin = {}, severity = null) =>
        dispatch({
          type: 'ENQUEUE_SNACKBAR',
          payload: {
            snackbar: {
              message: message,
              anchorOrigin,
              severity,
            },
          },
        }),
    };
  })(component);
};
