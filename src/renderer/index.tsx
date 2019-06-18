import 'react-hot-loader';
import './styles.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '../shared/store';
import { ipcRenderer } from './services';

const store = configureStore();

ipcRenderer.on('print', (event: any, ...args: any[]) => {
  console.log('[Main Process]', ...args);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
