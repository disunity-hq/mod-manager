import React, { ReactElement } from 'react';
import { Menu, Layout, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { SideBarProps } from './NavBar';

const { Sider } = Layout;

type GamesSideBarProps = SideBarProps;

const GamesSideBar = ({
  collapsed: expanded,
  theme,
  toggleExpanded,
  segment,
}: React.PropsWithChildren<GamesSideBarProps>): ReactElement => (
  <Sider collapsible collapsed={expanded} onCollapse={toggleExpanded} theme={theme}>
    <Menu theme={theme} selectedKeys={[segment || 'browse']} mode="inline">
      <Menu.Item key="browse">
        <Icon type="search" />
        <span>Browse for Games</span>
        <Link to="/games" />
      </Menu.Item>
      <Menu.Item key="risk_of_rain_2">
        <Icon type="file-unknown" />
        <span>Risk of Rain 2</span>
        <Link to="/games/risk_of_rain_2" />
      </Menu.Item>
    </Menu>
  </Sider>
);

export default GamesSideBar;
