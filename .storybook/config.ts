import { configure, addDecorator } from '@storybook/react';
import 'antd/dist/antd.css';
import { withProvider, withRouter } from './decorators';
// automatically import all files ending in *.stories.tsx
const req = require.context('../src/stories/', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator(withProvider);
addDecorator(withRouter);

configure(loadStories, module);
