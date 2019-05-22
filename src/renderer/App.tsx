import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.scss";
import Nav from "./components/window/NavBar/NavBar";
import { Layout } from "antd";
import WindowTitle from "./components/window/Title/Title";

const { Header, Content } = Layout;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Layout style={{minHeight: "100vh"}} >
          <Header style={{height: "48px"}} >
            <WindowTitle />
          </Header>
          <Content>
            <Nav />
          </Content>
        </Layout>
      </Provider>
    );
  }
}
