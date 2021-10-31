import ActionType from '../types/actionType';

export const makeSnackbar = (message, anchorOrigin = {}, severity = null) => ({
  type: ActionType.ENQUEUE_SNACKBAR,
  payload: { snackbar: { message, anchorOrigin, severity } },
});
