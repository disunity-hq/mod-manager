import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import Index from "./components/pages/Index";
interface Props {}
interface State {}

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <HashRouter>
        <Route path="/" exact component={Index} />
      </HashRouter>
    );
  }
}
