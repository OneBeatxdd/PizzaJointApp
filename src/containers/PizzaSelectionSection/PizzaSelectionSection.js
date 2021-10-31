import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, List, Button, Card, CardHeader, CardContent, CardActions, CardMedia, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PageLoadingView from '../../components/PageLoadingView/PageLoadingView';

import { pizzaListRequest } from '../../actions/pizza';
import { pizzaListSelector, pizzaLoadingSelector } from '../../selectors/pizzaSelectors';
import PizzaSelectionDialog from '../PizzaSelectionDialog/PizzaSelectionDialog';

import testImage from '../../../public/1.png';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '300px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const PizzaSelectionSection = ({ makeSnackbar, onMount, pizzas, loading }) => {
  const classes = useStyles();

  const [selectedPizza, setSelectedPizza] = useState(null);
  useEffect(() => {
    onMount();
  }, []);

  if (loading) return <PageLoadingView />;

  return (
    <>
      <Grid container item spacing={1}>
        {pizzas
          ? pizzas.map((pizza) => (
              <Grid item key={`pizza-${pizza.id}`} xs={6} md={4}>
                <Card className={classes.card} onClick={() => setSelectedPizza(pizza.id)}>
                  <CardHeader title={pizza.name} />
                  <CardMedia className={classes.media} image={pizza.imageUrl} />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {pizza.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
      {selectedPizza ? <PizzaSelectionDialog pizzaId={selectedPizza} onClose={() => setSelectedPizza(null)} /> : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    pizzas: pizzaListSelector(state),
    loading: pizzaLoadingSelector(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMount: () => {
      dispatch(pizzaListRequest());
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

export default connect(mapStateToProps, mapDispatchToProps)(PizzaSelectionSection);
