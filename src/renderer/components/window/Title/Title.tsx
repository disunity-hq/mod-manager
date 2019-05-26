import { Button } from 'antd';
import { ipcRenderer } from '../../../services';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWindowMinimize,
  faWindowMaximize,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import ButtonGroup from 'antd/lib/button/button-group';

const WindowTitle = (): React.FunctionComponentElement<void> => {
  return (
    <div className="nav-bar right-side">
      <ButtonGroup style={{ display: 'flex' }}>
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
      </ButtonGroup>
    </div>
  );
};

export default WindowTitle;
