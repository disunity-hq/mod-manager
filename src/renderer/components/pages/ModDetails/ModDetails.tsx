import React from 'react';
import { RootState } from '../../../store/types';
import { PackageDetails } from '../../../../models';
import { Layout, Typography } from 'antd';
import { connect } from 'react-redux';
import { RouteChildrenProps, withRouter } from 'react-router';

const { Content } = Layout;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StateProps {}

type ModDetailsOwnProps = RouteChildrenProps<{ game: string; owner: string; name: string }>;

const mapStateToProps = (state: RootState, { match }: ModDetailsOwnProps): StateProps => {
  const { game, owner, name } = match.params;
  const gameData = state.games.games[game];
  if (gameData) {
    return {
      package: gameData.packages.find((pkg): boolean => pkg.name === name && pkg.owner === owner),
    };
  } else {
    return { package: {} };
  }
};

type ModDetailsProps = ReturnType<typeof mapStateToProps> & ModDetailsOwnProps;

const ModDetails = ({ match }: ModDetailsProps): React.ReactElement => (
  <Layout>
    <Content style={{ background: '#fff', minHeight: 600 }}>
      <Typography.Text>
        {match.params.name} by <small>{match.params.owner}</small>
      </Typography.Text>
    </Content>
  </Layout>
);

export default withRouter(connect(mapStateToProps)(ModDetails));
