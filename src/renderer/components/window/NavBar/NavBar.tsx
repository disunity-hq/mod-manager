/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import './NavBar.scss';
import { toggleNavBar1Expanded, toggleNavBar2Expanded } from './actions';
import { connect } from 'react-redux';
import { RootState } from '../../../store/types';
import { Route } from 'react-router-dom';
import GamesSideBar from './GamesSideBar';
import MainSideBar from './MainSideBar';
import { SiderTheme } from 'antd/lib/layout/Sider';
import { EmptyAC } from 'typesafe-actions';
import { ExpandedState } from './reducers';

const { Content, Footer } = Layout;

interface StateProps {
  expanded: ExpandedState;
  theme: SiderTheme;
  location: string;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    expanded: state.navBar.expanded,
    theme: state.theme,
    location: state.router.location.pathname,
  };
};

const mapDispatchToProps = {
  toggle1Expanded: toggleNavBar1Expanded,
  toggle2Expanded: toggleNavBar2Expanded,
};

export interface SideBarProps {
  collapsed?: boolean;
  segment?: string;
  theme: SiderTheme;
  toggleExpanded: EmptyAC<string>;
}

type NavBarProps = StateProps & typeof mapDispatchToProps;

const MainNavBar = ({
  children,
  location,
  expanded,
  theme,
  toggle1Expanded,
  toggle2Expanded,
}: React.PropsWithChildren<NavBarProps>): React.ReactElement => {
  const segments = location.split('/').filter(s => s);
  return (
    <Layout style={{ minHeight: 'calc(100vh - 48px)' }}>
      <Route
        render={() => (
          <MainSideBar
            theme={theme}
            collapsed={!expanded.t1}
            segment={segments[0]}
            toggleExpanded={toggle1Expanded}
          />
        )}
      />
      <Route
        path="/games"
        render={() => (
          <GamesSideBar
            theme={theme}
            collapsed={!expanded.t2}
            segment={segments[1]}
            toggleExpanded={toggle2Expanded}
          />
        )}
      />
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Layout>
            <Content>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Disunity</Footer>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

const Nav = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNavBar);

export default Nav;
