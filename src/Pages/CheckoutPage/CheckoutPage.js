import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Button, List, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { checkoutRequest, toppingListRequest } from '../../actions/pizza';
import { basketSelector, pizzaDetailsSelector, toppingsLoadingSelector, toppingsSelector } from '../../selectors/pizzaSelectors';
import OrderListItem from '../../containers/OrderListItem/OrderListItem';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
  },
  gridcontainer: {
    padding: '16px',
  },
  list: {
    width: '100%',
  },
  checkoutButton: {
    width: '100%',
  },
  divider: {
    width: '100%',
  },
}));

const CheckoutPage = ({ onSubmit, makeSnackbar, basket }) => {
  const classes = useStyles();

  const handleSubmit = () => {
    onSubmit(basket);
    makeSnackbar('Paid!', {}, 'success');
  };

  const calTotalAmount = () => {
    if (basket.length === 0) return 0;
    const result = basket.reduce((acc, curr) => ({
      price: acc.price + curr.price,
    }));
    return result.price;
  };

  return (
    <Grid container justifyContent="space-between" direction="column" wrap="nowrap" className={classes.gridcontainer}>
      <Grid item className={classes.content}>
        <Typography variant="h4" component="h2" gutterBottom>
          Basket
        </Typography>
        <Grid container item spacing={3}>
          <List className={classes.list}>
            {basket ? basket.map((orderItem, index) => <OrderListItem key={`order-item-${index}`} order={orderItem} index={index} />) : null}
          </List>
          <Divider className={classes.divider} />
          <Grid item container justifyContent="flex-end">
            {/* Total */}
            <Typography>Total: ${calTotalAmount()}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          disabled={basket.length === 0}
          className={classes.checkoutButton}
          onClick={handleSubmit}
        >
          Checkout (${calTotalAmount()})
        </Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    pizza: pizzaDetailsSelector(state, ownProps.pizzaId),
    loading: toppingsLoadingSelector(state),
    toppings: toppingsSelector(state),
    basket: basketSelector(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMount: () => {
      dispatch(toppingListRequest());
    },
    onSubmit: (order) => {
      dispatch(checkoutRequest(order, ownProps.history.push));
    },
    makeSnackbar: (message, anchorOrigin = {}, severity = null) => {
      dispatch({
        type: 'ENQUEUE_SNACKBAR',
        payload: {
          snackbar: {
            message,
            anchorOrigin,
            severity,
          },
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
