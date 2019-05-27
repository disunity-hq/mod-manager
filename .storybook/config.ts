import { configure } from '@storybook/react';
import 'antd/dist/antd.less';
import '../src/renderer/App.scss';
// automatically import all files ending in *.stories.tsx
const req = require.context('../src/', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
