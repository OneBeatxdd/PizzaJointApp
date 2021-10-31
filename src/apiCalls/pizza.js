import pizzas from '../testData/pizzas';
import lastOrder from '../testData/lastOrder';
import toppings from '../testData/toppings';

export const getPizzas = (querys) => {
  // normally there will be a BE call here!
  // api('get', `${envars.pizzaServiceUrl}/pizzas`, {}, { params: querys });
  return {
    data: {
      data: {
        pizzas
      }
    }
  };
}

export const getLastOrdered = () => {
  // normally there will be a BE call here!
  // api('get', `${envars.pizzaServiceUrl}/last-order`, {});
  return {
    data: {
      data: {
        lastOrder
      }
    }
  };
}

export const getToppings = (querys) => {
  // normally there will be a BE call here!
  // api('get', `${envars.pizzaServiceUrl}/toppings`, {}, { params: querys });
  return {
    data: {
      data: {
        toppings
      }
    }
  };
}

export const checkout = (order) => {
  // normally there will be a BE call here!
  // api('post', `${envars.pizzaServiceUrl}/checkout`, { order });
  return {
    data: {
      data: {
        order
      }
    }
  };
}
