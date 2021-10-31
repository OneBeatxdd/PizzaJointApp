import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import errorMessageDict from '../../utils/error-message-dict';

import ErrorIcon from '@material-ui/icons/Error';

const PageErrorView = props => {
  let { noPadding, onRetry, error } = props;
  let style = {
    textAlign: 'center',
    paddingTop: noPadding ? 0 : 150,
    paddingBottom: noPadding ? 0 : 150
  };

  let errorMessage = 'Error';
  if (error) {
    if (error.messageKey) {
      errorMessage = errorMessageDict[error.messageKey];
    } else if (error.message) {
      errorMessage = error.message;
    }
  }

  return (
    <div style={style}>
      <Grid container>
        <Grid item container xs spacing={4} direction="column">
          <Grid item>
            <Typography component="div" variant="h2" color="primary">
              <ErrorIcon fontSize="inherit" />
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="primary" variant="h5">
              {errorMessage}
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={onRetry} variant="outlined" color="primary">
              Retry
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default PageErrorView;
