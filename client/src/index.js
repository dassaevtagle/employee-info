import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'notyf/notyf.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/brands'
import '@fortawesome/fontawesome-free/js/fontawesome'
import 'spinkit/spinkit.min.css'
import './Styles/GlobalStyles.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);