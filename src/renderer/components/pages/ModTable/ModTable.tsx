import React from 'react';
import { Table } from 'antd';
import { TableRowSelection } from 'antd/lib/table';
import { PackageDetails } from '../../../../models';
import { setFocusedPackage } from '../ModDetails/actions';
import { connect } from 'react-redux';

import * as styles from './ModTable.scss';

interface ModTableData extends PackageDetails {
  key: string;
}

const data: ModTableData[] = [
  { key: 'r2api', name: 'R2API', owner: 'tristanmcpherson' },
  { key: 'sharesuite', name: 'ShareSuite', owner: 'FunkFrog-and-Sipondo' },
];

const rowSelection: TableRowSelection<ModTableData> = {
  onChange: (selectedRowKeys, selectedRows): void => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, `selectedRows: `, selectedRows);
  },
  getCheckboxProps: (record): object => ({
    name: record.name,
  }),
};

const mapDispatchToProps = {
  openDetails: setFocusedPackage,
};

type ModTableProps = typeof mapDispatchToProps;

const ModTable = ({ openDetails }: ModTableProps): React.ReactElement => (
  <Table<ModTableData>
    rowSelection={rowSelection}
    dataSource={data}
    rowClassName={(): string => styles.clickable}
    onRow={(record): object => ({
      onClick: (): void => {
        console.log(record);
        openDetails(record);
      },
    })}
  >
    <Table.Column<ModTableData> key="name" dataIndex="name" title="Name" />
    <Table.Column<ModTableData> key="author" dataIndex="author" title="Author" />
  </Table>
);

export default connect(
  null,
  mapDispatchToProps
)(ModTable);
