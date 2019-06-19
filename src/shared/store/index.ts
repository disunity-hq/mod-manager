import { createStore, applyMiddleware, StoreEnhancer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import withReduxEnhancer from 'addon-redux/enhancer';
import { replayActionMain, replayActionRenderer } from 'electron-redux';
import createMiddleware, { epicMiddleware } from './middleware';
import { rootReducer, rootEpics } from './root';
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
  // configure middlewares
  const middlewares = createMiddleware(scope);

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

  if (scope === 'main') {
    epicMiddleware.run(rootEpics.main);
    replayActionMain(store);
  } else if (scope === 'renderer') {
    epicMiddleware.run(rootEpics.renderer);
    replayActionRenderer(store);
  }

  return store;
};
