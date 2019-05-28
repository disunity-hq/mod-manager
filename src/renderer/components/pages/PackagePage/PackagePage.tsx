import React from 'react';
import { RootState } from '../../../store/types';
import { IPackageDetails } from '../../../../models';
import { Layout, Typography } from 'antd';
import { connect } from 'react-redux';
import ModTable from '../ModTable/ModTable';
import ModDetails from '../ModDetails/ModDetails';

const { Content } = Layout;

interface StateProps {
  focused: IPackageDetails;
}

const mapStateToProps = (state: RootState): StateProps => ({
  focused: state.packageDetails.focused,
});

type PackagePageProps = ReturnType<typeof mapStateToProps>;

const PackagePage = ({ focused }: PackagePageProps): React.ReactElement => (
  <Layout>
    <Content>
      <ModTable />
      {focused ? <ModDetails /> : null}
    </Content>
  </Layout>
);

export default connect(mapStateToProps)(PackagePage);
