import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import Twoverlay from './components/Twoverlay';
import reducer from './reducers';
import localStorage from './middleware/localStorage';
import cycler from './middleware/cycler';
import timer from './middleware/timer';
import chatListener from './listeners/chat';
import notificationListener from './listeners/notification';
import XSplitInterface from './components/XSplitInterface';

const store =
  createStore(reducer, applyMiddleware(localStorage, cycler, timer));

const { location, document } = global;

notificationListener(store);
chatListener(store);
store.dispatch({ type: 'load' });

const BaseComponent =
  location.search === '?xsplit'
    ? XSplitInterface
    : Twoverlay;

ReactDOM.render(
  <BaseComponent {...{ store }} />,
  document.getElementById('root'),
);
