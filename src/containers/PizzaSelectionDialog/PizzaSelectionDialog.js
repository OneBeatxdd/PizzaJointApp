import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Dialog, AppBar, Toolbar, IconButton, Button, FormControlLabel, CheckBox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import PageLoadingView from '../../components/PageLoadingView/PageLoadingView';

import { addToBasket, pizzaListRequest, toppingListRequest } from '../../actions/pizza';
import { pizzaDetailsSelector, pizzaLoadingSelector, toppingsLoadingSelector, toppingsSelector } from '../../selectors/pizzaSelectors';

const useStyles = makeStyles((theme) => ({
  title: {
    justifyContent: 'space-between',
  },
  toppingPriceTag: {
    color: theme.palette.grey[400],
  },
}));

const PizzaSelectionDialog = ({ onSubmit, makeSnackbar, onMount, pizza, loading, onClose, toppings }) => {
  const classes = useStyles();

  const [selectedToppings, setSelectedToppings] = useState({});
  useEffect(() => {
    onMount();
  }, []);

  const calTotalCost = () => {
    let cost = pizza.price;
    const toppingIds = [];
    Object.keys(selectedToppings).map((id) => {
      if (selectedToppings[id]) toppingIds.push(id);
    });
    for (let i = 0; i < toppingIds.length; i++) {
      const toppingId = toppingIds[i];
      const topping = toppings.find((t) => t.id === Number(toppingId));
      cost += topping.price;
    }
    return cost;
  };

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

  if (loading) return <PageLoadingView />;

  return (
    <Dialog fullScreen open onClose={onClose}>
      <AppBar>
        <Toolbar className={classes.title}>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {pizza.name}
          </Typography>
          <Button color="inherit" onClick={handleSubmit}>
            Add
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item>
          <Typography>{pizza.name}</Typography>
        </Grid>
        {/* image */}
        <Grid item>
          <img src={pizza.imageUrl} />
        </Grid>
        {/* description */}
        <Grid item>{pizza.description}</Grid>
        {/* toppings */}
        <Grid container item>
          {toppings
            ? toppings.map((topping) => (
                <FormControlLabel
                  key={`topping-${topping.id}`}
                  control={
                    <CheckBox
                      checked={!!selectedToppings[topping.id]}
                      onChange={(event) => {
                        setSelectedToppings({
                          ...selectedToppings,
                          [topping.id]: event.target.checked,
                        });
                      }}
                      color="primary"
                    />
                  }
                  label={
                    <>
                      <Typography>{topping.name}</Typography> <Typography className={classes.toppingPriceTag}>(+${topping.price})</Typography>
                    </>
                  }
                />
              ))
            : null}
        </Grid>
        {/* price */}
        <Grid item>
          <Button onClick={handleSubmit}>Add to Basket (${calTotalCost()})</Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    pizza: pizzaDetailsSelector(state, ownProps.pizzaId),
    loading: toppingsLoadingSelector(state),
    toppings: toppingsSelector(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(PizzaSelectionDialog);
