import React from 'react';
import { storiesOf } from '@storybook/react';
import ModTable from './ModTable';
import { withRedux, withRouter } from '../../../../../.storybook/decorators';

const stories = storiesOf('Disunity|Pages/ModTable', module);

stories
  .addDecorator(withRouter)
  .addDecorator(withRedux())
  .add('Table', (): React.ReactElement => <ModTable />);
