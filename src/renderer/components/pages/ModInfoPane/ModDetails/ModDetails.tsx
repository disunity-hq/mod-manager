import React from 'react';
import { hot } from 'react-hot-loader';
import { PackageDetails } from '../../../../../models';
import { Layout, Typography } from 'antd';

const { Content } = Layout;

interface ModDetailsOwnProps {
  package: PackageDetails;
}

type ModDetailsProps = ModDetailsOwnProps;

const ModDetails = ({ package: pkg }: ModDetailsOwnProps): React.ReactElement => (
  <Layout>
    <Content>
      <Typography.Title>{pkg.name}</Typography.Title>
    </Content>
  </Layout>
);

export default hot(module)(ModDetails);
