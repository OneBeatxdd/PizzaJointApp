import ActionType from '../types/actionType';
import { deletCookie, setCookie } from '../utils/cookies';

let initState = {
  authToken: null,
  user: null,
  snackBarQueue: [],
  dialogRequest: null,
  permissionId: null,
  permissions: [],
  snackbarQueue: [],
  mobileNavBarOpen: false,
  overlayLoading: false,
  showNavDrawer: false,
};

const system = (originalState = initState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      let user = JSON.parse(atob(action.payload.authToken.split('.')[1]));
      setCookie('authToken', action.payload.authToken);
      return {
        ...originalState,
        authToken: action.payload.authToken,
        user,
        permissionId: user.permissionId,
      };
    case ActionType.LOGOUT:
      sessionStorage.clear();
      deletCookie('authToken');
      return {
        ...originalState,
        authToken: null,
        user: null,
        permissionId: null,
      };
    case ActionType.OPEN_MOBILE_NAV_BAR:
      return {
        ...originalState,
        mobileNavBarOpen: true,
      };
    case ActionType.CLOSE_MOBILE_NAV_BAR:
      return {
        ...originalState,
        mobileNavBarOpen: false,
      };
    case ActionType.ENQUEUE_SNACKBAR:
      return {
        ...originalState,
        snackbarQueue: [...originalState.snackbarQueue, action.payload.snackbar],
      };
    case ActionType.DEQUEUE_SNACKBAR:
      let snackbarQueue = [...originalState.snackbarQueue];
      snackbarQueue.splice(0);
      return {
        ...originalState,
        snackbarQueue: snackbarQueue,
      };
    case ActionType.PLACE_DIALOG_REQUEST:
      return {
        ...originalState,
        dialogRequest: action.payload.dialogRequest,
      };
    case ActionType.REMOVE_DIALOG_REQUEST:
      return {
        ...originalState,
        dialogRequest: null,
      };
    case ActionType.SHOW_OVERLAY_LOADING:
      return {
        ...originalState,
        overlayLoading: true,
      };
    case ActionType.HIDE_OVERLAY_LOADING:
      return {
        ...originalState,
        overlayLoading: false,
      };
    case ActionType.OPEN_NAV_DRAWER:
      return {
        ...originalState,
        showNavDrawer: true,
      };
    case ActionType.HIDE_NAV_DRAWER:
      return {
        ...originalState,
        showNavDrawer: false,
      };
    default:
      return { ...originalState };
  }
};

export default system;
