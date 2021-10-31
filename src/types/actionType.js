const KeyMirror = require('keymirror');

const ActionType = KeyMirror({
  // **************************************************************************************************************
  // AUTHENTICATION
  // **************************************************************************************************************
  LOGIN: null,
  LOGOUT: null,
  // **************************************************************************************************************
  // NAVIGATION
  // **************************************************************************************************************
  OPEN_MOBILE_NAV_BAR: null,
  CLOSE_MOBILE_NAV_BAR: null,
  OPEN_NAV_DRAWER: null,
  HIDE_NAV_DRAWER: null,
  // **************************************************************************************************************
  // NOTIFICATION
  // **************************************************************************************************************
  ENQUEUE_SNACKBAR: null,
  DEQUEUE_SNACKBAR: null,
  PLACE_DIALOG_REQUEST: null,
  REMOVE_DIALOG_REQUEST: null,
  // **************************************************************************************************************
  // UTILS
  // **************************************************************************************************************
  SHOW_OVERLAY_LOADING: null,
  HIDE_OVERLAY_LOADING: null,
  // **************************************************************************************************************
  // PIZZA
  // **************************************************************************************************************
  PIZZA_LIST_REQUEST: null,
  PIZZA_LIST_REQUEST_SUCCESS: null,
  PIZZA_LIST_REQUEST_FAILURE: null,
  LAST_ORDER_REQUEST: null,
  LAST_ORDER_REQUEST_SUCCESS: null,
  LAST_ORDER_REQUEST_FAILURE: null,
  TOPPINGS_LIST_REQUEST: null,
  TOPPINGS_LIST_REQUEST_SUCCESS: null,
  TOPPINGS_LIST_REQUEST_FAILURE: null,
  ADD_TO_BASKET: null,
  REMOVE_FROM_BASKET: null,
});

export default ActionType;
