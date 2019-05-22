import React from "react";
import { Menu, Icon, Layout, Breadcrumb, Button, Switch } from "antd";
import "./NavBar.scss";
import SubMenu from "antd/lib/menu/SubMenu";
import { toggleNavBarExpanded } from "./actions";
import { connect } from "react-redux";
import { RootState } from "../../../store/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad
} from "@fortawesome/free-solid-svg-icons";
import { changeTheme } from "../../../store/root-reducer";

const { Content, Footer, Sider } = Layout;

const mapStateToProps = (state: RootState) => {
  return { expanded: state.navBar.expanded, theme: state.theme };
};

const mapDispatchToProps = {
  toggleExpanded: toggleNavBarExpanded,
  changeTheme: changeTheme
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const MainNavBar = ({ expanded, toggleExpanded, changeTheme, theme }: Props) => {
  return (
    <Layout style={{ minHeight: "calc(100vh - 48px)" }}>
      <Sider collapsible collapsed={expanded} onCollapse={toggleExpanded} theme={theme} >
        <div className="logo" />
        <Menu
          theme={theme}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["gamesSubMenu"]}
          mode="inline"
          selectable={false}
        >
          <SubMenu
            key="gamesSubMenu"
            title={
              <span>
                <FontAwesomeIcon icon={faGamepad} size="1x" color="white" style={{marginRight: "10px"}} />
                <span>My Games</span>
              </span>
            }
          >
            {/* Load in games from store */}
            <Menu.Item key="GameName-1">Risk of Rain 2</Menu.Item>
            <Menu.Item key="addGame" >
              <Icon type="plus" />
              <span>Add Game</span>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="2">
            <Icon type="search" />
            <span>Browse Mods</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="setting" />
                <span>Settings</span>
              </span>
            }
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                <span>Team</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Sider collapsible collapsed={false} onCollapse={() => {}} theme={theme}>
          <Menu
            theme={theme}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["gamesSubMenu"]}
            mode="inline"
          >
            <SubMenu
              key="gamesSubMenu"
              title={
                <span>
                  <Icon type="folder" />
                  <span>My Games</span>
                </span>
              }
            >
              {/* Load in games from store */}
              <Menu.Item key="GameName-1">Risk of Rain 2</Menu.Item>
              <Menu.Item key="addGame">
                <Icon type="plus" />
                <span>Add Game</span>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="2">
              <Icon type="search" />
              <span>Browse Mods</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="setting" />
                  <span>Settings</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ margin: "0 16px" }}>
          <Layout>
            <Content>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                Bill is a cat.
              </div>
              <Switch defaultChecked checked={theme === "dark"} onChange={() => changeTheme(theme === "dark" ? "light" : "dark")} />
            </Content>
            <Footer style={{ textAlign: "center" }}>Disunity</Footer>
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
