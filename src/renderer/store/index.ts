import { createStore, applyMiddleware, Middleware, StoreEnhancer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import withReduxEnhancer from 'addon-redux/enhancer';
import { createEpicMiddleware } from 'redux-observable';
import history from '../history';
import { navbarClose } from './middleware';
import { rootReducer, rootEpic } from './root';
import { RootState, RootAction } from './types';

// rexport the root types for easy access
export * from './root';

// rehydrate state on app start
const initialState: Partial<RootState> = {};

// Export the configure function
export const configureStore = (state: Partial<RootState> = initialState): Store<RootState> => {
  const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, void>();

  // configure middlewares
  const middlewares: Middleware[] = [
    // Uncomment to have redux update the url bar (probably not necessary)
    routerMiddleware(history),
    epicMiddleware,
    navbarClose,
  ];

  const enhancers: StoreEnhancer[] = [applyMiddleware(...middlewares)];

  // OPTIONAL: attach when in Storybook env
  if (process.env.STORYBOOK_ENV) {
    enhancers.push(withReduxEnhancer);
  }

  // compose enhancers
  const enhancer = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, state, enhancer);

  if (module.hot) {
    module.hot.accept(
      './root',
      (): void => {
        const nextRootReducer = require('./root').rootReducer;
        store.replaceReducer(nextRootReducer);
      }
    );
  }

  epicMiddleware.run(rootEpic);

  return store;
};
