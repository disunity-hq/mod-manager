import * as React from 'react';
import 'antd/dist/antd.less';
import { Layout } from 'antd';
import { ConnectedRouter } from 'connected-react-router';
import * as styles from './App.scss';
import Nav from './components/window/NavBar/NavBar';
import WindowTitle from './components/window/Title/Title';
import history from '../shared/store/history';
import Routes from './Routes';
import { hot } from 'react-hot-loader';

const { Content } = Layout;

class App extends React.Component {
  public render(): React.ReactNode {
    return (
      <ConnectedRouter history={history}>
        <Layout style={{ minHeight: '100vh' }}>
          <WindowTitle />
          <Content className={styles.content}>
            <Nav>
              <Routes />
            </Nav>
          </Content>
        </Layout>
      </ConnectedRouter>
    );
  }
}

export default hot(module)(App);
