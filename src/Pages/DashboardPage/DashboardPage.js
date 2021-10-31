import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, Grid } from '@material-ui/core';
import LastOrderLane from '../../containers/LastOrderLane/LastOrderLane';
import PizzaSelectionSection from '../../containers/PizzaSelectionSection/PizzaSelectionSection';

const DashboardPage = ({ onMount }) => {
  useEffect(() => onMount(), []);
  return (
    <div className="paper-with-padding">
      <Typography variant="h4" component="h2" gutterBottom>
        Welcome to Deadpool Pizza Joint, only severing the best :)
      </Typography>
      <Grid container spacing={3}>
        {/* Lanes */}
        <LastOrderLane />
        {/* fav */}

        {/* main selection */}
        <PizzaSelectionSection />
      </Grid>
    </div>
  );

};

const mapStateToProps = (state) => {
  return {
    user: state.system.user,
    permissionId: state.system.permissionId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {},
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
