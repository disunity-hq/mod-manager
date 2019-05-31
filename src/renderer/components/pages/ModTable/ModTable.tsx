import React, { useEffect } from 'react';
import { Table } from 'antd';
import { TableRowSelection } from 'antd/lib/table';
import { PackageDetails, Loadable } from '../../../../models';
import { connect } from 'react-redux';

import * as styles from './ModTable.scss';
import { push } from 'connected-react-router';
import { RouteChildrenProps, withRouter } from 'react-router';
import { RootState } from '../../../store/types';
import { GameData } from '../../../store/games/reducer';
import { fetchPackagesAsync } from '../../../store/packages/actions';

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
  const packages = game && state.packages[game.id];
  return {
    game: game,
    packages: Array.isArray(packages)
      ? packages.map((pkg): ModTableData => ({ ...pkg, key: pkg.name }))
      : null,
    loading: packages && (packages as Loadable).loading,
  };
};

const mapDispatchToProps = {
  navigate: push,
  fetchPackages: fetchPackagesAsync.request,
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
        fetchPackages(null, match.params.game);
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
