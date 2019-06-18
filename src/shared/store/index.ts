import { createStore, applyMiddleware, Middleware, StoreEnhancer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import withReduxEnhancer from 'addon-redux/enhancer';
import { createEpicMiddleware } from 'redux-observable';
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer,
} from 'electron-redux';
import { navbarClose } from './middleware';
import { rootReducer, rootEpic } from './root';
import { RootState, RootAction, StoreScope } from './types';
import { isRenderer } from '../helpers';

// rexport the root types for easy access
export * from './root';

// rehydrate state on app start
const initialState: Partial<RootState> = {};

// Export the configure function
export const configureStore = (
  state: Partial<RootState> = initialState,
  scope: StoreScope = isRenderer ? 'renderer' : 'main'
): Store<RootState> => {
  const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, void>();

  // configure middlewares
  let middlewares: Middleware[] = [epicMiddleware, navbarClose];

  if (scope === 'renderer') {
    const router = routerMiddleware(require('./history').default);
    middlewares = [forwardToMain, router, ...middlewares];
  } else if (scope === 'main') {
    middlewares = [triggerAlias, ...middlewares, forwardToRenderer];
  }

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
  if (scope === 'main') {
    replayActionMain(store);
  } else if (scope === 'renderer') {
    replayActionRenderer(store);
  }

  return store;
};
