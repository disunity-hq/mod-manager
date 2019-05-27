import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TestPage from './components/pages/TestPage';
import IndexPage from './components/pages/Index';

export default class Routes extends React.Component {
  public render(): React.ReactNode {
    return (
      <Switch>
        <Redirect path="/" exact={true} to="/games" />
        <Route path="/games" exact={true} component={IndexPage} />
        <Route path="/settings" component={TestPage} />
      </Switch>
    );
  }
}
