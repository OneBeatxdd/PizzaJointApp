import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { pizzaListRequest, removeFromBasket, toppingListRequest } from '../../actions/pizza';
import { pizzaDetailsSelector, pizzaLoadingSelector, toppingsLoadingSelector, toppingsSelector } from '../../selectors/pizzaSelectors';
import PageLoadingView from '../../components/PageLoadingView/PageLoadingView';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}));

const OrderListItem = ({ order, loading, onMount, pizza, toppings, onDelete, index }) => {
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
    <ListItem>
      <ListItemAvatar>
        <Avatar src={pizza.imageUrl} />
      </ListItemAvatar>
      <ListItemText primary={pizza.name} secondary={secondaryText()} />
      <ListItemSecondaryAction>
        ${order.price}{' '}
        <IconButton
          onClick={() => {
            onDelete(index);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
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
    onDelete: (index) => {
      dispatch(removeFromBasket(index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListItem);
