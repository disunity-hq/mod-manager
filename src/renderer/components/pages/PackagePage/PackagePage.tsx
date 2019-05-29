import React from 'react';
import { RootState } from '../../../store/types';
import { PackageDetails } from '../../../../models';
import { Layout, Typography } from 'antd';
import { connect } from 'react-redux';
import ModTable from '../ModTable/ModTable';
import ModDetails from '../ModDetails/ModDetails';
import { Route } from 'react-router-dom';

const { Content } = Layout;

interface StateProps {
  focused: PackageDetails;
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
      {/* <Route path="/games/:game/:author/:package" component={ModDetails} /> */}
    </Content>
  </Layout>
);

export default connect(mapStateToProps)(PackagePage);
