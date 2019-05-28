import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TestPage from './components/pages/TestPage';
import PackagePage from './components/pages/PackagePage/PackagePage';

export default class Routes extends React.Component {
  public render(): React.ReactNode {
    return (
      <Switch>
        <Redirect path="/" exact={true} to="/games" />
        <Route path="/games" component={PackagePage} />
        <Route path="/settings" component={TestPage} />
      </Switch>
    );
  }
}
