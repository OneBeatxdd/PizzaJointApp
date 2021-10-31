import ActionType from '../types/actionType';

export const pizzaListRequest = () => ({ type: ActionType.PIZZA_LIST_REQUEST });
export const pizzaListRequestSuccess = (data) => ({ type: ActionType.PIZZA_LIST_REQUEST_SUCCESS, payload: data });
export const pizzaListRequestFailure = (error) => ({ type: ActionType.PIZZA_LIST_REQUEST_FAILURE, payload: error });

export const lastOrderListRequest = () => ({ type: ActionType.LAST_ORDER_REQUEST });
export const lastOrderListRequestSuccess = (data) => ({ type: ActionType.LAST_ORDER_REQUEST_SUCCESS, payload: data });
export const lastOrderListRequestFailure = (error) => ({ type: ActionType.LAST_ORDER_REQUEST_FAILURE, payload: error });

export const toppingListRequest = () => ({ type: ActionType.TOPPINGS_LIST_REQUEST });
export const toppingListRequestSuccess = (data) => ({ type: ActionType.TOPPINGS_LIST_REQUEST_SUCCESS, payload: data });
export const toppingListRequestFailure = (error) => ({ type: ActionType.TOPPINGS_LIST_REQUEST_FAILURE, payload: error });

export const addToBasket = (order) => ({ type: ActionType.ADD_TO_BASKET, payload: { order } });
export const removeFromBasket = (index) => ({ type: ActionType.REMOVE_FROM_BASKET, payload: { index } });

export const checkoutRequest = (basket, historyPush) => ({ type: ActionType.CHECKOUT_REQUEST, payload: { basket, historyPush } });
export const checkoutRequestSuccess = (data) => ({ type: ActionType.CHECKOUT_REQUEST_SUCCESS, payload: data });
export const checkoutRequestFailure = (error) => ({ type: ActionType.CHECKOUT_REQUEST_FAILURE, payload: error });
