import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from './Calendar/Calendar';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import reducer from './store/reducer';
import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<CalendarState, CalendarAction> & {
  dispatch: DispatchType
} = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
		<Provider store={store}>
    <Calendar />
		</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
