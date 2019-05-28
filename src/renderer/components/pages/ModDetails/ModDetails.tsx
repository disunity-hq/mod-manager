import React from 'react';
import { RootState } from '../../../store/types';
import { PackageDetails } from '../../../../models';
import { Layout, Typography } from 'antd';
import { connect } from 'react-redux';

const { Content } = Layout;

interface StateProps {
  focused: PackageDetails;
}

const mapStateToProps = (state: RootState): StateProps => ({
  focused: state.packageDetails.focused,
});

type ModDetailsProps = ReturnType<typeof mapStateToProps>;

const ModDetails = ({ focused }: ModDetailsProps): React.ReactElement => (
  <Layout>
    <Content style={{ background: '#fff', minHeight: 600 }}>
      <Typography.Text>{focused.name}</Typography.Text>
    </Content>
  </Layout>
);

export default connect(mapStateToProps)(ModDetails);
