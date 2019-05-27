import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.scss';
import Nav from './components/window/NavBar/NavBar';
import { Layout } from 'antd';
import WindowTitle from './components/window/Title/Title';
import { ConnectedRouter } from 'connected-react-router';
import history from './store/history';
import Routes from './Routes';

const { Header, Content } = Layout;

export default class App extends React.Component {
  public render(): React.ReactNode {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: 48, padding: 0 }}>
              <WindowTitle />
            </Header>
            <Content style={{ marginTop: 48 }}>
              <Nav>
                <Routes />
              </Nav>
            </Content>
          </Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}
