import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import Index from "./components/pages/Index";
import { Provider } from "react-redux";
import configureStore from "./store";
import "./App.scss";
import NavBar from "./components/window/NavBar";
const store = configureStore();

interface State {}
interface Props {}

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <NavBar/>
          <Route path="/" exact component={Index} />
        </HashRouter>
      </Provider>
    );
  }
}
