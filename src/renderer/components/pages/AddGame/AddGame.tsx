import React from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;

const AddGame = (): React.ReactElement => (
  <Layout>
    <Content>
      <Typography.Title>Browse For Games</Typography.Title>
    </Content>
  </Layout>
);

export default AddGame;
