import React, { ReactElement } from 'react';
import { Menu, Layout, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { SideBarProps } from './NavBar';
import { RouteChildrenProps, withRouter } from 'react-router';

const { Sider } = Layout;

type ModsSideBarProps = SideBarProps & RouteChildrenProps<{ game: string }>;

const ModsSideBar = ({
  collapsed: expanded,
  theme,
  toggleExpanded,
  segment,
  match,
}: React.PropsWithChildren<ModsSideBarProps>): ReactElement => (
  <Sider collapsible collapsed={expanded} onCollapse={toggleExpanded} theme={theme}>
    <Menu theme={theme} selectedKeys={[segment]} mode="inline">
      <Menu.Item key="r2api">
        <Icon type="container" />
        <span>R2API</span>
        <Link to={`/games/${match.params.game}/r2api`} />
      </Menu.Item>
      <Menu.Item key="lorem_ipsum">
        <Icon type="container" />
        <span>Lorem Ipsum</span>
        <Link to={`/games/${match.params.game}/lorem_ipsum`} />
      </Menu.Item>
    </Menu>
  </Sider>
);

export default ModsSideBar;
