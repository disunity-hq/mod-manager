import React from 'react';
import { storiesOf } from '@storybook/react';
import ModTable from './ModTable';
import { withRedux } from '../../../../../.storybook/decorators';

const stories = storiesOf('Disunity|Pages/ModTable', module);

stories.addDecorator(withRedux()).add('Table', (): React.ReactElement => <ModTable />);
