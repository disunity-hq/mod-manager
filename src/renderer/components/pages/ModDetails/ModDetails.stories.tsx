import React from 'react';
import { storiesOf, Renderable } from '@storybook/react';
import ModDetails from './ModDetails';

storiesOf('Disunity|Pages/ModDetails', module).add('ModDetails', (): Renderable => <ModDetails />);
