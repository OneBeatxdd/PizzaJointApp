let envars;
if (process.env.REACT_APP_PJA_ENV !== 'development') {
  envars = {
    userServiceUrl: '<deployed-service-ip>',
    pizzaServiceUrl: '<deployed-service-ip>',
  };
} else {
  envars = {
    userServiceUrl: 'http://localhost:3002',
    pizzaServiceUrl: '<deployed-service-ip>',
  };
}

export default envars;
