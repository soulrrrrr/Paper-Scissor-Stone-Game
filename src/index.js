import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import app from './reducers'


let init = {
  choices:[
  {
    id: 1,
    choosed: false,
  },
  {
    id: 2,
    choosed: false,
  },
  {
    id: 3,
    choosed: false,
  }],
  locked: {
    myId: null,
    oppoId: null,
  },
  room: {
    id: null,
    pos: null,
    player: null,
  },
  record: {
    win: 0,
    lose: 0,
  },
  now: 'LOGIN',
}

let store = createStore(app, init);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
