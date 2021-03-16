import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

//Icon 
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

