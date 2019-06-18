import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../src/shared/store';
import { RenderFunction, StoryDecorator } from '@storybook/react';
import { ConnectedRouter } from 'connected-react-router';
import history from '../src/shared/store/history';
import withReduxCore, { Action } from 'addon-redux/withRedux';
import addons from '@storybook/addons';
import { DeepPartial } from 'redux';

const withReduxSettings = {};

export const withRedux = <TState extends {}>(
  state?: DeepPartial<TState>,
  actions?: Action[]
): StoryDecorator => {
  const store = configureStore(state, 'renderer');
  if (process.env.STORYBOOK_ENV) return withReduxCore(addons)({ Provider, store, state, actions });
  else return story => <Provider store={store}>{story()}</Provider>;
};

export const withRouter: StoryDecorator = (story: RenderFunction) => (
  <ConnectedRouter history={history}>{story()}</ConnectedRouter>
);
