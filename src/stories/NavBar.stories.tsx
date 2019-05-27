import React from 'react';
import NavBar from '../renderer/components/window/NavBar/NavBar';
import { withRouter, withRedux } from '../../.storybook/decorators';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Disunity|Window/Navbar', module);

stories
  .addDecorator(withRouter)
  .addDecorator(withRedux())
  .add('NavBar', () => <NavBar />);
