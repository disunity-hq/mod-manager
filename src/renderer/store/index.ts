import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./root-reducer";


export type AppState = ReturnType<typeof rootReducer>;

// export default function configureStore() {
//   //const middlewares = [thunkMiddleware];
//   const middleWareEnhancer = 
//   return createStore(rootReducer, middleWareEnhancer);
// }

// configure middlewares
const middlewares = [composeWithDevTools];
// compose enhancers
const enhancer = composeWithDevTools();

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer, initialState, enhancer);

// export store singleton instance
export default store;
