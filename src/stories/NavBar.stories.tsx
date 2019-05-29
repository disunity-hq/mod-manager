import React from 'react';
import NavBar from '../renderer/components/window/NavBar/NavBar';
import { withRouter, withRedux } from '../../.storybook/decorators';
import { storiesOf } from '@storybook/react';
import GamesSideBar from '../renderer/components/window/NavBar/GamesSideBar';
import MainSideBar from '../renderer/components/window/NavBar/MainSideBar';

const stories = storiesOf('Disunity|Window/Navbar', module);

stories
  .addDecorator(withRouter)
  .addDecorator(withRedux())
  .add('GamesSideBar', () => <GamesSideBar theme="light" toggleExpanded={() => ({ type: '' })} />)
  .add('MainSideBar', () => <MainSideBar theme="light" toggleExpanded={() => ({ type: '' })} />)
  .add('NavBar', () => <NavBar />);
