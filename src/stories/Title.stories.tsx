import React from 'react';
import Title from '../renderer/components/window/Title/Title';
import { storiesOf, Renderable } from '@storybook/react';
import WindowButtons from '../renderer/components/window/Title/WindowButtons';

storiesOf('Disunity|Window/Title', module)
  .add('Title Bar', (): Renderable => <Title />)
  .add('Window Buttons', (): Renderable => <WindowButtons />);
