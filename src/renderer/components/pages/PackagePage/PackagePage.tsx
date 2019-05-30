import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import ModTable from '../ModTable/ModTable';
import ModInfoPane from '../ModInfoPane/ModInfoPane';
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
        <Switch>
          <Redirect exact from="/games/:game/:owner/:name" to="/games/:game/:owner/:name/details" />
          <Route path="/games/:game/:owner/:name/:page" component={ModInfoPane} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default PackagePage;
