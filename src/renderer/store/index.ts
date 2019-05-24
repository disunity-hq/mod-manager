import { createStore, combineReducers, applyMiddleware, Middleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./root-reducer";
import { routerMiddleware } from "connected-react-router";
import history from "./history";


export type AppState = ReturnType<typeof rootReducer>;

// configure middlewares
const middlewares: Middleware[] = [
  // Uncomment to have redux update the url bar (probably not necessary)
  routerMiddleware(history)
];
// compose enhancers
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer, initialState, enhancer);

// export store singleton instance
export default store;
