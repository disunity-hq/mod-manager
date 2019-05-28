import React from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWindowMinimize,
  faWindowMaximize,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { ipcRenderer } from '../../../services';

import * as styles from './Title.scss';

const WindowButtons = (): React.ReactElement => (
  <Button.Group style={{ display: 'flex' }}>
    <Button
      type="link"
      className={[styles.appButton, styles.clickable].join(' ')}
      onClick={() => ipcRenderer.send('app-minimize')}
    >
      <FontAwesomeIcon icon={faWindowMinimize} size="1x" color="white" />
    </Button>
    <Button
      type="link"
      className={[styles.appButton, styles.clickable].join(' ')}
      onClick={() => ipcRenderer.send('app-maximize')}
    >
      <FontAwesomeIcon icon={faWindowMaximize} size="1x" color="white" />
    </Button>
    <Button
      type="link"
      className={[styles.appButton, styles.appCloseButton, styles.clickable].join(' ')}
      onClick={() => ipcRenderer.send('app-close')}
    >
      <FontAwesomeIcon icon={faWindowClose} size="1x" color="white" />
    </Button>
  </Button.Group>
);

export default WindowButtons;
