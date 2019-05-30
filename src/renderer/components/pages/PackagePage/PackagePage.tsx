import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import ModTable from '../ModTable/ModTable';
import ModDetails from '../ModDetails/ModDetails';
import { Route, Redirect, Switch } from 'react-router-dom';

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
        <Switch>
          <Redirect exact from="/games/:game/:owner/:name" to="/games/:game/:owner/:name/details" />
          <Route path="/games/:game/:owner/:name/:page" component={ModDetails} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default connect(null)(PackagePage);
