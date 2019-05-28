import React from 'react';
import { storiesOf, Renderable } from '@storybook/react';
import ModDetails from './ModDetails';
import { withRedux } from '../../../../../.storybook/decorators';
import { PackageDetails } from '../../../../models';
import { RootState } from '../../../store/types';

const TestPackages: PackageDetails = {
  name: 'Mock Package',
  owner: 'Scottbot',
};

storiesOf('Disunity|Pages/ModDetails', module)
  .addDecorator(withRedux<RootState>({ packageDetails: { focused: TestPackages } }))
  .add('ModDetails', (): Renderable => <ModDetails />);