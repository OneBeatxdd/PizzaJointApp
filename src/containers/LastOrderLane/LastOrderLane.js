import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, List, Button, Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { lastOrderListRequest } from '../../actions/pizza';
import { lastOrderedSelector, pizzaLoadingSelector } from '../../selectors/pizzaSelectors';
import LastOrderItem from '../LastOrderItem/LastOrderItem';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '300px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const LastOrderLane = ({ makeSnackbar, onMount, lastOrders, loading }) => {
  const classes = useStyles();
  const [createDialog, setCreateDialog] = useState(false);
  useEffect(() => {
    onMount();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          Order again :)
        </Grid>
        {lastOrders.length > 0
          ? lastOrders.map((lastOrder, index) => (
              <LastOrderItem order={lastOrder} index={index}/>
            ))
          : null}
      </Grid>
    </>
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
