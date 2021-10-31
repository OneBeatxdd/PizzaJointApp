import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import withGlobalUI from './utils/with-global-ui';
import TopBar from './containers/TopBar/TopBar';
import { CssBaseline, Grid } from '@material-ui/core';

import SnackbarManager from './containers/SnackBarManager/SnackbarManager';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import OverlayLoadingManager from './containers/OverlayLoadingManager/OverlayLoadingManager';
import { getCookie } from './utils/cookies';
import { login, logout } from './actions/users';
import CheckoutPage from './Pages/CheckoutPage/CheckoutPage';
class App extends Component {
  componentDidMount = async () => {
    // auth stuff
  };

  render() {
    return (
      <BrowserRouter>
        <CssBaseline />
        {/* top bar nav */}
        <TopBar />
        {/* main */}

        <Grid
          container
          className={this.props.classes.pageContainerFullWidth}
        >
          <Switch>
            <Route path="/" component={DashboardPage} exact />
            <Route path="/check-out" component={CheckoutPage} exact />
          </Switch>
        </Grid>
        <SnackbarManager />
        <OverlayLoadingManager />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.system.user,
    authToken: state.system.authToken,
    showNavDrawer: state.system.showNavDrawer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (authToken) => dispatch(login(authToken)),
    logout: () => dispatch(logout),
  };
};

const styles = () => ({
  pageContainer: {
    width: 'calc(100vw - 73px)',
    marginLeft: '73px',
  },
  pageContainerCollapsed: {
    width: 'calc(100vw - 235px)',
    marginLeft: '235px',
  },
  pageContainerFullWidth: {
    width: '100vw',
    marginLeft: '0',
    height: 'calc(100vh - 64px)',
  },
});

export default withGlobalUI(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));
