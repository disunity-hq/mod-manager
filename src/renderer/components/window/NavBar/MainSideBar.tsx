import React, { ReactElement } from 'react';
import { Menu, Layout, Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { SideBarProps } from './NavBar';

const { Sider } = Layout;

type MainSideBarProps = SideBarProps;

const MainSideBar = ({
  collapsed: expanded,
  theme,
  toggleExpanded,
  segment,
}: MainSideBarProps): ReactElement => (
  <Sider collapsible collapsed={expanded} onCollapse={toggleExpanded} theme={theme}>
    <Menu theme={theme} selectedKeys={[segment]} mode="inline">
      <Menu.Item key="games">
        <Icon
          component={(): React.ReactElement => (
            <FontAwesomeIcon icon={faGamepad} size="1x" color="white" />
          )}
        />
        <span>My Games</span>
        <Link to="/games" />
      </Menu.Item>
      <Menu.Item key="settings">
        <Icon type="setting" />
        <span>Settings</span>
        <Link to="/settings" />
      </Menu.Item>
    </Menu>
  </Sider>
);

export default MainSideBar;
