import React from 'react';
import { storiesOf } from '@storybook/react';
import ModTable from './ModTable';

const stories = storiesOf('Disunity|Pages/ModTable', module);

stories.add('Table', (): React.ReactElement => <ModTable />);
