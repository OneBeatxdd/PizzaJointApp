import { withSnackbar } from '../containers/SnackBarManager/SnackbarManager';
import { withOverlayLoading } from '../containers/OverlayLoadingManager/OverlayLoadingManager';

const withGlobalUI = (component) => {
  return withOverlayLoading(withSnackbar(component));
};

export default withGlobalUI;
