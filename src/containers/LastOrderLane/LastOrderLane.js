import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, List, Button, Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { lastOrderListRequest } from '../../actions/pizza';
import { lastOrderedSelector, pizzaLoadingSelector } from '../../selectors/pizzaSelectors';
import LastOrderItem from '../LastOrderItem/LastOrderItem';

const useStyles = makeStyles((theme) => ({
  lastOrderLaneContent: {
    overflow: 'scroll',
    width: '100vw',
  },
}));

const LastOrderLane = ({ makeSnackbar, onMount, lastOrders, loading }) => {
  const classes = useStyles();
  useEffect(() => {
    onMount();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        Order again :)
      </Grid>
      <Grid item container xs={12} wrap="nowrap" className={classes.lastOrderLaneContent} spacing={2}>
        {lastOrders.length > 0
          ? lastOrders.map((lastOrder, index) => (
              <Grid item key={`last-order-item-${index}`} xs={4}>
                <LastOrderItem order={lastOrder} index={index} />
              </Grid>
            ))
          : null}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    lastOrders: lastOrderedSelector(state),
    loading: pizzaLoadingSelector(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMount: () => {
      dispatch(lastOrderListRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LastOrderLane);
