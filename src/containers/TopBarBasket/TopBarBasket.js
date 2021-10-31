import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Typography, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import { basketSelector } from '../../selectors/pizzaSelectors';

const useStyles = makeStyles((theme) => ({
  button: {
    height: '100%',
    padding: '8px',
  },
}));
const TopBarBasket = ({ basketCount, historyPush }) => {
  const classes = useStyles();
  return (
    <ButtonBase onClick={() => historyPush('/check-out')} className={classes.button}>
      <Grid container spacing={3} alignItems="center" direction="row" wrap="nowrap">
        <Grid item>
          <ShoppingCartRoundedIcon />
        </Grid>
        <Grid item>{basketCount}</Grid>
      </Grid>
    </ButtonBase>
  );
};

const mapStateToProps = (state) => {
  return {
    basketCount: basketSelector(state).length,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch({ type: 'LOGOUT' }),
    historyPush: ownProps.history.push,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBarBasket));
