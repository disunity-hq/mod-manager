import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import Index from "./components/pages/Index";
import { Provider } from "react-redux";
import store from "./store";
import "./App.scss";
import Nav from "./components/window/NavBar";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Nav />
      </Provider>
    );
  }
}
