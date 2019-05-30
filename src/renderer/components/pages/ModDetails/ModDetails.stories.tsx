import React from 'react';
import { storiesOf, Renderable } from '@storybook/react';
import ModDetails from './ModDetails';
import { withRedux, withRouter } from '../../../../../.storybook/decorators';
import { PackageDetails } from '../../../../models';
import { RootState } from '../../../store/types';

const TestPackages: PackageDetails = {
  name: 'Mock Package',
  owner: 'Scottbot',
};

storiesOf('Disunity|Pages/ModDetails', module)
  .addDecorator(withRouter)
  .addDecorator(withRedux<RootState>())
  .add('ModDetails', (): Renderable => <ModDetails />);
