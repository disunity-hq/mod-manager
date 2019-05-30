import React, { useEffect } from 'react';
import { Table } from 'antd';
import { TableRowSelection } from 'antd/lib/table';
import { PackageDetails } from '../../../../models';
import { connect } from 'react-redux';
import { oc } from 'ts-optchain';

import * as styles from './ModTable.scss';
import { push } from 'connected-react-router';
import { RouteChildrenProps, withRouter } from 'react-router';
import { RootState } from '../../../store/types';
import { fetchPackagesForGameAsync } from '../../../store/games/actions';
import { GameData } from '../../../store/games/reducer';

interface ModTableData extends PackageDetails {
  key: string;
}

const rowSelection: TableRowSelection<ModTableData> = {
  onChange: (selectedRowKeys, selectedRows): void => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, `selectedRows: `, selectedRows);
  },
  getCheckboxProps: (record): object => ({
    name: record.name,
  }),
};

interface ModTableStateProps {
  packages: ModTableData[];
  game: GameData;
  loading: boolean;
}

type ModTableOwnProps = RouteChildrenProps<{ game: string }>;

const mapStateToProps = (state: RootState, props: ModTableOwnProps): ModTableStateProps => {
  const game = state.games.games[props.match.params.game];
  console.log(game);
  return {
    game: game,
    packages: game && game.packages.map((pkg): ModTableData => ({ ...pkg, key: pkg.name })),
    loading: game && game.packages.loading
  };
};

const mapDispatchToProps = {
  navigate: push,
  fetchPackages: fetchPackagesForGameAsync.request,
};

type ModTableProps = typeof mapDispatchToProps & ModTableStateProps & ModTableOwnProps;

const ModTable = ({
  navigate,
  match,
  fetchPackages,
  packages,
  game,
  loading,
}: ModTableProps): React.ReactElement => {
  useEffect(
    (): void => {
      console.log(packages, loading);
      if (game && !loading && (!packages || packages.length === 0))
        fetchPackages(match.params.game);
    }
  );
  return (
    <Table<ModTableData>
      rowSelection={rowSelection}
      dataSource={packages}
      loading={loading}
      rowClassName={(): string => styles.clickable}
      onRow={(record): object => ({
        onClick: (): void => {
          // openDetails(record);
          navigate(`/games/${match.params.game}/${record.owner}/${record.name}`);
        },
      })}
    >
      <Table.Column<ModTableData> key="name" dataIndex="name" title="Name" />
      <Table.Column<ModTableData> key="owner" dataIndex="owner" title="Author" />
    </Table>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ModTable)
);
