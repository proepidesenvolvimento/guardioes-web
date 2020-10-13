import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
//import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'mdbreact/dist/css/mdb.css';
import 'utils/assets/fonts/Lovelo-Black.ttf';
import 'utils/assets/fonts/ArgentumSans-Regular.otf';
global.jQuery = require('jquery');
require('bootstrap/dist/js/bootstrap');

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
