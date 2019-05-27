import { Typography, Layout } from 'antd';
import React from 'react';

import image from '../../../../../logo.png';
import WindowButtons from './WindowButtons';

const { Title } = Typography;
const { Header } = Layout;

const WindowTitle = (): React.ReactElement => {
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: 48, padding: 0 }}>
      <div className="nav-bar">
        <div className="app-title">
          <img className="logo" src={image} />
          <Title level={3} style={{ color: 'white', paddingLeft: '10px', margin: 0 }}>
            Disunity Manager
          </Title>
        </div>
        <WindowButtons />
      </div>
    </Header>
  );
};

export default WindowTitle;
