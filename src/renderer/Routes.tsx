import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TestPage from './components/pages/TestPage';
import AddGamePage from './components/pages/AddGame/AddGame';
import PackagePage from './components/pages/PackagePage/PackagePage';

export default class Routes extends React.Component {
  public render(): React.ReactNode {
    return (
      <Switch>
        <Redirect path="/" exact to="/games" />
        <Redirect path="/games" exact to="/games/browse" />

        <Route path="/games/browse" component={AddGamePage} />
        <Route path="/games/:game" component={PackagePage} />
        <Route path="/settings" component={TestPage} />
      </Switch>
    );
  }
}
