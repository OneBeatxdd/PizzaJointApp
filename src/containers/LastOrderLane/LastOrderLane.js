import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, List, Button } from '@material-ui/core';

import { lastOrderListRequest } from '../../actions/pizza';

const LastOrderLane = ({ makeSnackbar, onMount, lastOrders, loading }) => {
  const [createDialog, setCreateDialog] = useState(false);
  useEffect(() => {
    onMount();
  }, []);

  return (
    <>
      <Grid item>
        lol
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    lastOrders: [],
    loading: false,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMount: () => {
      dispatch(lastOrderListRequest());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LastOrderLane);
