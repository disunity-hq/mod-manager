import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/renderer/store';
import { RenderFunction } from '@storybook/react';
import { ConnectedRouter } from 'connected-react-router';
import history from '../src/renderer/store/history';
import withReduxCore, { Action } from 'addon-redux/withRedux';
import addons from '@storybook/addons';
import { DeepPartial } from 'redux';

const withReduxSettings = {};

export const withRedux = <TState extends {}>(state?: DeepPartial<TState>, actions?: Action[]) =>
  withReduxCore(addons)({ Provider, store, state, actions });

export const withRouter = (story: RenderFunction) => (
  <ConnectedRouter history={history}>{story()}</ConnectedRouter>
);
