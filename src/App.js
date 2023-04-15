import React from "react";
import Routes from "./routes";
import {createStore,applyMiddleware} from 'redux'

import thunk from 'redux-thunk';

import {Provider} from 'react-redux';
import allReducers from "./redux/reducers";

export default function App() {
  const store = createStore(allReducers,applyMiddleware(thunk))

    return <Provider store={store}>
    <Routes />
  </Provider>
  
}