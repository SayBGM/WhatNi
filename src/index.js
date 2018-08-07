import React from 'react';
import ReactDOM from 'react-dom';
import './assets/font/font.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
