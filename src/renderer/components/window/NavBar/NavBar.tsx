/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ReactElement } from 'react';
import { Menu, Icon, Layout, Breadcrumb } from 'antd';
import './NavBar.scss';
import { toggleNavBar1Expanded, toggleNavBar2Expanded, toggleNavBar3Expanded } from './actions';
import { connect } from 'react-redux';
import { RootState } from '../../../store/types';
import { Link, withRouter, RouteComponentProps, Switch, Route } from 'react-router-dom';
import GamesSideBar from './GamesSideBar';
import MainSideBar from './MainSideBar';
import { SiderTheme } from 'antd/lib/layout/Sider';
import { EmptyAC } from 'typesafe-actions';
import ModsSideBar from './ModsSideBar';
import { ExpandedState } from './reducers';

const { Content, Footer, Sider } = Layout;

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
  toggle3Expanded: toggleNavBar3Expanded,
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
  toggle3Expanded,
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
      <Switch>
        <Route path="/games/browse" render={() => <div />} />
        <Route
          path="/games/:game"
          render={props => (
            <ModsSideBar
              theme={theme}
              collapsed={!expanded.t3}
              segment={segments[2]}
              toggleExpanded={toggle3Expanded}
              {...props}
            />
          )}
        />
      </Switch>
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

const Nav = withRouter(
  connect<ReturnType<typeof mapStateToProps>, typeof mapDispatchToProps, RouteComponentProps>(
    mapStateToProps,
    mapDispatchToProps
  )(MainNavBar)
);

export default Nav;
