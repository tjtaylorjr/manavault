import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './App';
import Footer from './components/static/Footer';

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Footer /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
