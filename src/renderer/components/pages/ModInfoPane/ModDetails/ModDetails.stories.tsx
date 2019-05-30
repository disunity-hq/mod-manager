import React from 'react';
import { storiesOf, Renderable } from '@storybook/react';
import ModDetails from './ModDetails';
import { PackageDetails } from '../../../../../models';

const testPackages: PackageDetails = {
  name: 'MockPackage',
  owner: 'scott',
};

storiesOf('Disunity|Pages/ModInfoPage/ModDetails', module).add(
  'ModDetails',
  (): Renderable => <ModDetails package={testPackages} />
);
