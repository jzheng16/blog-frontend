
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';


const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

const composedEnhancer = compose(applyMiddleware(thunk, createLogger({ collapsed: true })), ...enhancerList);

const initStore = () => createStore(rootReducer, {}, composedEnhancer);

module.exports = {
  initStore
};