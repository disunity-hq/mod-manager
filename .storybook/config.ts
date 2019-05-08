import { configure } from '@storybook/react';
import "antd/dist/antd.css";
// automatically import all files ending in *.stories.tsx
const req = require.context('../src/stories/', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
