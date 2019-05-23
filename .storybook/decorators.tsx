import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/renderer/store';
import { RenderFunction } from '@storybook/react';
import { MemoryRouter } from 'react-router';

export const withProvider = (story: RenderFunction) => (
  <Provider store={store}>{story()}</Provider>
);

export const withRouter = (story: RenderFunction) => (
  <MemoryRouter>{story()}</MemoryRouter>
);
