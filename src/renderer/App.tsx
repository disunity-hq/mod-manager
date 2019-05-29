import * as React from 'react';
import { Provider } from 'react-redux';
import 'antd/dist/antd.less';
import { Layout } from 'antd';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore } from './store';
import './App.scss';
import Nav from './components/window/NavBar/NavBar';
import WindowTitle from './components/window/Title/Title';
import history from './history';
import Routes from './Routes';

const { Content } = Layout;

const store = configureStore();

export default class App extends React.Component {
  public render(): React.ReactNode {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout style={{ minHeight: '100vh' }}>
            <WindowTitle />
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
