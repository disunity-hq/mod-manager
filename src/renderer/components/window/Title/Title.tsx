import { Typography, Layout, Avatar } from 'antd';
import React from 'react';

import image from '../../../../../logo.png';
import WindowButtons from './WindowButtons';
import * as styles from './Title.scss';

const { Text } = Typography;
const { Header } = Layout;

const WindowTitle = (): React.ReactElement => {
  return (
    <Header className={styles.navBar}>
      <img src={image} className={styles.logo} />
      <Text className={styles.title}>Disunity.io</Text>
      <Text>Mod Manager</Text>
      <WindowButtons className={styles.appButtons} />
    </Header>
  );
};

export default WindowTitle;
