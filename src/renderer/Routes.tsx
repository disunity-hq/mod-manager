import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TestPage from './components/pages/TestPage';
import IndexPage from './components/pages/Index';

export default class Routes extends React.Component {
  public render(): React.ReactNode {
    return (
      <Switch>
        <Route path="/" exact={true} component={IndexPage} />
        <Route component={TestPage} />
      </Switch>
    );
  }
}
