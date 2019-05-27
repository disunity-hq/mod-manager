import { createStore, combineReducers, applyMiddleware, Middleware, StoreEnhancer } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from "connected-react-router";
import withReduxEnhancer from 'addon-redux/enhancer';
import rootReducer from "./root-reducer";
import history from "./history";
import { navbarClose } from "./middleware";


export type AppState = ReturnType<typeof rootReducer>;

// configure middlewares
const middlewares: Middleware[] = [
  // Uncomment to have redux update the url bar (probably not necessary)
  routerMiddleware(history),
  navbarClose
];

const enhancers: StoreEnhancer[] = [applyMiddleware(...middlewares)];

// OPTIONAL: attach when in Storybook env
if (process.env.STORYBOOK_ENV) {

  enhancers.push(withReduxEnhancer);
}



// compose enhancers
const enhancer = composeWithDevTools(...enhancers);

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer, initialState, enhancer);

// export store singleton instance
export default store;
