import React from 'react';
import ReactDOM from 'react-dom';
import WebSocketDB from './components/WebSocketDB';
import Overlay from './components/Overlay';
import './index.css';

ReactDOM.render(
  <WebSocketDB><Overlay /></WebSocketDB>,
  document.getElementById('root')
);
