import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import ModTable from '../ModTable/ModTable';
import ModDetails from '../ModDetails/ModDetails';
import { Route } from 'react-router-dom';

const { Content } = Layout;

// interface StateProps {
//   focused: PackageDetails;
// }

// const mapStateToProps = (state: RootState): StateProps => ({
//   focused: state.packageDetails.focused,
// });

// const mapDispatchToProps = {
//   loadGames: loadGamesAsync.request,
// };

// type PackagePageProps = typeof mapDispatchToProps;

const PackagePage = (): React.ReactElement => {
  return (
    <Layout>
      <Content>
        <ModTable />
        {/* {focused ? <ModDetails /> : null} */}
        <Route path="/games/:game/:owner/:name" component={ModDetails} />
      </Content>
    </Layout>
  );
};

export default connect(null)(PackagePage);
