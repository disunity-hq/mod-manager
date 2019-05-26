import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.scss';
import Nav from './components/window/NavBar/NavBar';
import { Layout } from 'antd';
import WindowTitle from './components/window/Title/Title';
import { ConnectedRouter } from 'connected-react-router';
import history from './store/history';
import { HashRouter, Router } from 'react-router-dom';

const { Header, Content } = Layout;

export default class App extends React.Component {
  public render(): React.ReactNode {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ height: '48px', padding: 0 }}>
              <WindowTitle />
            </Header>
            <Content>
              <Nav />
            </Content>
          </Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}
