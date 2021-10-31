import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import TimerSand from '../../icons/TimerSand';
import './OverlayLoadingManager.css';

class OverlayLoadingManager extends Component {
  state = {
    show: false,
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.overlayLoading !== this.props.overlayLoading) {
      this.setState({ show: this.props.overlayLoading });
      if(this.props.overlayLoading){
        document.body.style.overflow = "hidden";
      }else{
        document.body.style.overflow = "inherit";
      }
    }
  };

  render() {
    const { show } = this.state;

    if (!show) {
      return <div />;
    }

    return (
      <div className={`loading-screen-overlay ${show ? 'active' : ''}`}>
        <Grid container>
          <Grid item xs>
            <div style={{textAlign: 'center', marginTop: '300px'}}>
              <div className="page-loading-view-icon">
                <TimerSand style={{ fontSize: '500%' }} />
              </div>
              <Typography color="textPrimary">Loading</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    overlayLoading: state.system.overlayLoading,
  };
};

export default connect(mapStateToProps)(OverlayLoadingManager);

export const withOverlayLoading = (component) => {
  return connect(null, (dispatch) => {
    return {
      showOverlayLoading: () =>
        dispatch({
          type: 'SHOW_OVERLAY_LOADING',
          payload: {},
        }),
    };
  })(component);
};
