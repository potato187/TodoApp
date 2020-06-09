import * as React from 'react';
import ReactDom from 'react-dom';

import App from './components/App/App';

import './assets/css/reset.scss';
import './assets/scss/index.scss';

ReactDom.render(
  <App />,
  document.getElementById('root')  
);