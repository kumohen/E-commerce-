import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './shoppingcart/reducers';
import App from './shoppingcart/App';
import "./App.css"


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk))
  )


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)