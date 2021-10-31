import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, IconButton, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { addToBasket, pizzaListRequest, toppingListRequest } from '../../actions/pizza';
import {
  basketSelector,
  pizzaDetailsSelector,
  pizzaLoadingSelector,
  toppingsLoadingSelector,
  toppingsSelector,
} from '../../selectors/pizzaSelectors';
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
}));

const CheckoutPage = ({ onSubmit, makeSnackbar, basket }) => {
  const classes = useStyles();

  const handleSubmit = () => {
    const toppingIds = [];
    Object.keys(selectedToppings).map((id) => {
      if (selectedToppings[id]) toppingIds.push(id);
    });
    const order = {
      pizzaId: pizza.id,
      toppings: toppingIds,
      price: calTotalCost(),
    };
    onSubmit(order);
    makeSnackbar('Added To Basket!', {}, 'success');
    onClose();
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
        </Grid>
      </Grid>

      <Grid item>
        <Button variant="contained" color="primary" disableElevation>
          Checkout
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
      dispatch(addToBasket(order));
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
