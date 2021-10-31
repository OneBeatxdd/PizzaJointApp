import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { addToBasket, pizzaListRequest, removeFromBasket, toppingListRequest } from '../../actions/pizza';
import { pizzaDetailsSelector, pizzaLoadingSelector, toppingsLoadingSelector, toppingsSelector } from '../../selectors/pizzaSelectors';
import PageLoadingView from '../../components/PageLoadingView/PageLoadingView';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}));

const LastOrderItem = ({ order, loading, onMount, pizza, toppings, onSubmit, index }) => {
  const classes = useStyles();
  useEffect(() => onMount(), []);
  if (loading || !toppings.length || !pizza) return <PageLoadingView />;
  const secondaryText = () => {
    if (order.toppings && order.toppings.length === 0) return '';
    const result = [];
    for (let i = 0; i < order.toppings.length; i++) {
      const id = order.toppings[i];
      const topping = toppings.find((t) => t.id === Number(id));
      result.push(`${topping.name} (+${topping.price})`);
    }
    return result.join(', ');
  };
  return (
    <Card className={classes.root} key={`last-order-${index}`}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {pizza.name}
        </Typography>
        <Typography variant="h5" component="h2"></Typography>
        <Typography variant="body2" component="p">
          {secondaryText()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onSubmit(order)}>
          Add to Basket
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    pizza: pizzaDetailsSelector(state, ownProps.order.pizzaId),
    loading: pizzaLoadingSelector(state) || toppingsLoadingSelector(state),
    toppings: toppingsSelector(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMount: () => {
      dispatch(pizzaListRequest());
      dispatch(toppingListRequest());
    },
    onSubmit: (order) => {
      dispatch(addToBasket(order));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LastOrderItem);
