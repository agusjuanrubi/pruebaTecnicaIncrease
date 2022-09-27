import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
//import{configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import myReducer from '../reducer/index.js';

const store = createStore(myReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store