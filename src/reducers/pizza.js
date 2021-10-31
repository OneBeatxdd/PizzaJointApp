import ActionType from '../types/actionType';
import { mapByKey } from '../utils/mapByKey';

let initState = {
  list: [],
  map: {},
  loading: false,
  lastOrder: [],
  toppings: {
    loading: false,
    map: {},
  },
  order: {
    list: [],
  },
};

const pizza = (originalState = initState, action) => {
  switch (action.type) {
    case ActionType.PIZZA_LIST_REQUEST:
      return {
        ...originalState,
        loading: true,
      };
    case ActionType.PIZZA_LIST_REQUEST_SUCCESS:
      return {
        ...originalState,
        loading: false,
        list: action.payload.pizzas,
        map: mapByKey(action.payload.pizzas, 'id'),
      };
    case ActionType.PIZZA_LIST_REQUEST_FAILURE:
      return {
        ...originalState,
        loading: false,
      };
    case ActionType.LAST_ORDER_REQUEST:
      return {
        ...originalState,
        loading: true,
      };
    case ActionType.LAST_ORDER_REQUEST_SUCCESS:
      return {
        ...originalState,
        loading: false,
        lastOrder: action.payload.lastOrder,
      };
    case ActionType.LAST_ORDER_REQUEST_FAILURE:
      return {
        ...originalState,
        loading: false,
      };
    case ActionType.TOPPINGS_LIST_REQUEST:
      return {
        ...originalState,
        toppings: {
          ...originalState.toppings,
          loading: true,
        },
      };
    case ActionType.TOPPINGS_LIST_REQUEST_SUCCESS:
      return {
        ...originalState,
        toppings: {
          loading: false,
          map: mapByKey(action.payload.toppings, 'id'),
        },
      };
    case ActionType.TOPPINGS_LIST_REQUEST_FAILURE:
      return {
        ...originalState,
        toppings: {
          ...originalState.toppings,
          loading: false,
        },
      };
    case ActionType.ADD_TO_BASKET: {
      const localCopyBasket = [...originalState.order.list];
      localCopyBasket.push(action.payload.order);
      return {
        ...originalState,
        order: {
          ...originalState.order,
          list: localCopyBasket,
        },
      };
    }
    case ActionType.REMOVE_FROM_BASKET: {
      const localCopyBasket = [...originalState.order.list];
      localCopyBasket.splice(action.payload.index, 1);
      return {
        ...originalState,
        order: {
          ...originalState.order,
          list: localCopyBasket,
        },
      };
    }
    case ActionType.CHECKOUT_REQUEST_SUCCESS: {
      const localCopyLastOrder = [...originalState.lastOrder];
      localCopyLastOrder.push(...action.payload.order);
      return {
        ...originalState,
        lastOrder: localCopyLastOrder,
      };
    }
    default:
      return { ...originalState };
  }
};

export default pizza;
