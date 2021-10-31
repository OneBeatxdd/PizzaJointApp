import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import TopBarBasket from '../TopBarBasket/TopBarBasket';

class TopBar extends Component {
  render = () => {
    const { classes } = this.props;
    return (
      <AppBar
        position="sticky"
        color="primary"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: this.props.showNavDrawer,
        })}
      >
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  {' '}
                  <Typography>Best Pizza Joint</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <TopBarBasket />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  };
}
const drawerWidth = 235;
const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.system.user,
    showNavDrawer: state.system.showNavDrawer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openMobileDrawer: () => dispatch({ type: 'OPEN_MOBILE_NAV_BAR' }),
    openNavDrawer: () => dispatch({ type: 'OPEN_NAV_DRAWER' }),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopBar)));
