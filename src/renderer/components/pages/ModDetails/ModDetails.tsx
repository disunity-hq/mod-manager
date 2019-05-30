import React from 'react';
import { RootState } from '../../../store/types';
import { PackageDetails } from '../../../../models';
import { Layout, Typography, Spin, Tabs } from 'antd';
import { connect } from 'react-redux';
import { RouteChildrenProps, withRouter } from 'react-router';

import * as styles from './ModDetails.scss';
import { push } from 'connected-react-router';

const { Content, Header } = Layout;
const { TabPane } = Tabs;

interface StateProps {
  pkg: PackageDetails;
}

type ModDetailsOwnProps = RouteChildrenProps<{
  game: string;
  owner: string;
  name: string;
  page: string;
}>;

const mapStateToProps = (state: RootState, { match }: ModDetailsOwnProps): StateProps => {
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

type ModDetailsProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  ModDetailsOwnProps;

const ModDetails = ({ pkg, match, navigate }: ModDetailsProps): React.ReactElement => {
  if (!pkg) {
    return <Spin />;
  }

  return (
    <Layout>
      <Header>
        <Typography.Text className={styles.header}>
          {pkg.name} by <small>{pkg.owner}</small>
        </Typography.Text>
      </Header>
      <Content>
        <Tabs defaultActiveKey={match.params.page} onChange={navigate}>
          <TabPane tab="Details" key="details">
            <Typography.Text>Details</Typography.Text>
          </TabPane>
          <TabPane tab="Settings" key="settings">
            <Typography.Text>settings</Typography.Text>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ModDetails)
);
