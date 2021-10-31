export const pizzaMapSelector = (state) => state.pizza.map;
export const pizzaListSelector = (state) => state.pizza.list;
export const pizzaLoadingSelector = (state) => state.pizza.loading;
export const pizzaDetailsSelector = (state, id) => state.pizza.map[id];
export const toppingsSelector = (state) => Object.values(state.pizza.toppings.map);
export const toppingsLoadingSelector = (state) => state.pizza.toppings.loading;

export const lastOrderedSelector = (state) => state.pizza.lastOrder;

export const basketSelector = (state) => state.pizza.order.list;
