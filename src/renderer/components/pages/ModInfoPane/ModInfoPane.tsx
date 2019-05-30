import React from 'react';
import { RootState } from '../../../store/types';
import { PackageDetails } from '../../../../models';
import { Layout, Typography, Spin, Tabs } from 'antd';
import { connect } from 'react-redux';
import { RouteChildrenProps, withRouter } from 'react-router';

import * as styles from './ModInfoPane.scss';
import { push } from 'connected-react-router';
import { hot } from 'react-hot-loader';
import ModDetails from './ModDetails/ModDetails';

const { Content, Header } = Layout;
const { TabPane } = Tabs;

interface StateProps {
  pkg: PackageDetails;
}

type ModInfoPaneOwnProps = RouteChildrenProps<{
  game: string;
  owner: string;
  name: string;
  page: string;
}>;

const mapStateToProps = (state: RootState, { match }: ModInfoPaneOwnProps): StateProps => {
  const { game, owner, name } = match.params;
  const gameData = state.games.games[game];
  const pkg = gameData
    ? gameData.packages.find((pkg): boolean => pkg.name === name && pkg.owner === owner)
    : null;

  return { pkg };
};

const mapDispatchToProps = {
  navigate: push,
};

type ModInfoPaneProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  ModInfoPaneOwnProps;

const ModInfoPane = ({ pkg, match, navigate }: ModInfoPaneProps): React.ReactElement => {
  if (!pkg) {
    return <Spin />;
  }

  return (
    <Layout>
      <Header className={styles.header}>
        <Typography.Text style={{ whiteSpace: 'pre' }}>
          {pkg.name} by <small>{pkg.owner}</small>
        </Typography.Text>
      </Header>
      <Content>
        <Tabs defaultActiveKey={match.params.page} onChange={navigate}>
          <TabPane tab="Details" key="details">
            <ModDetails package={pkg} />
          </TabPane>
          <TabPane tab="Settings" key="settings">
            <Typography.Text>settings</Typography.Text>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default hot(module)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ModInfoPane)
  )
);
