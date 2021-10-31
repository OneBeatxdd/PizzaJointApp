import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/store';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { sallyStyle } from './Themes';
import { Provider } from 'react-redux';

ReactDOM.render(
  <MuiThemeProvider theme={sallyStyle}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>, document.getElementById('root'));
