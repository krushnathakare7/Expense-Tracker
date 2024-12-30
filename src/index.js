// DO NOT TOUCH THE BELOW LINE
import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {store} from './redux/store'
import { Provider } from 'react-redux'


// DO NOT TOUCH THE BELOW 3 LINES
if (window.Cypress) {
  window.store = store;
}

// WRITE YOUR CODE HERE
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,document.getElementById('root'))

// DO NOT TOUCH THE BELOW LINE
reportWebVitals();
