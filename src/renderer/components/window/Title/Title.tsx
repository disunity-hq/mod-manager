import { Button, Typography } from 'antd';
import { ipcRenderer } from '../../../services';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWindowMinimize,
  faWindowMaximize,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';

const { Title } = Typography;

const WindowTitle = (): React.ReactElement => {
  return (
    <div className="nav-bar">
      <Title level={3} style={{ color: 'white' }}>
        Disunity Manager
      </Title>
      <Button.Group style={{ display: 'flex' }}>
        <Button
          type="link"
          className="app-button clickable"
          onClick={() => ipcRenderer.send('app-minimize')}
        >
          <FontAwesomeIcon icon={faWindowMinimize} size="1x" color="grey" />
        </Button>
        <Button
          type="link"
          className="app-button clickable"
          onClick={() => ipcRenderer.send('app-maximize')}
        >
          <FontAwesomeIcon icon={faWindowMaximize} size="1x" color="grey" />
        </Button>
        <Button
          type="link"
          className="app-button app-close-button clickable"
          onClick={() => ipcRenderer.send('app-close')}
        >
          <FontAwesomeIcon icon={faWindowClose} size="1x" color="red" />
        </Button>
      </Button.Group>
    </div>
  );
};

export default WindowTitle;
