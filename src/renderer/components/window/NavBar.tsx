import React from "react";
import { Menu, Icon, Layout, Breadcrumb, Button } from "antd";
import "./NavBar.scss";
import SubMenu from "antd/lib/menu/SubMenu";
import { toggleNavBarExpanded } from "./actions";
import { connect } from "react-redux";
import { RootState } from "../../store/types";
import { ipcRenderer } from "electron";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowMaximize,
  faWindowMinimize,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";

const { Header, Content, Footer, Sider } = Layout;

const mapStateToProps = (state: RootState) => {
  return { expanded: state.navBar.expanded };
};

const mapDispatchToProps = {
  toggleExpanded: toggleNavBarExpanded
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const NavBar = ({ expanded, toggleExpanded }: Props) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={expanded} onCollapse={toggleExpanded}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Icon type="folder" />
            <span>My Mods</span>
          </Menu.Item>
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
        <Header style={{ background: "#fff", padding: 0 }}>
          <div className="nav-bar right-side">
            <Button
              type="link"
              className="app-button clickable"
              onClick={() => ipcRenderer.send("app-minimize")}
            >
              <FontAwesomeIcon icon={faWindowMinimize} size="2x" color="grey" />
            </Button>
            <Button
              type="link"
              className="app-button clickable"
              onClick={() => ipcRenderer.send("app-maximize")}
            >
              <FontAwesomeIcon icon={faWindowMaximize} size="2x" color="grey" />
            </Button>
            <Button
              type="link"
              className="app-button clickable"
              onClick={() => ipcRenderer.send("app-close")}
            >
              <FontAwesomeIcon icon={faWindowClose} size="2x" color="red" />
            </Button>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

const Nav = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default Nav;
