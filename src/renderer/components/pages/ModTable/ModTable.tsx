import React from 'react';
import { Table } from 'antd';
import { TableRowSelection } from 'antd/lib/table';

interface ModTableData {
  key: string;
  name: string;
  author: string;
}

const data: ModTableData[] = [
  { key: 'r2api', name: 'R2API', author: 'tristanmcpherson' },
  { key: 'sharesuite', name: 'ShareSuite', author: 'FunkFrog-and-Sipondo' },
];

const rowSelection: TableRowSelection<ModTableData> = {
  onChange: (selectedRowKeys, selectedRows): void => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, `selectedRows: `, selectedRows);
  },
  getCheckboxProps: (record): object => ({
    name: record.name,
  }),
};

const ModTable = (): React.ReactElement => (
  <Table<ModTableData> rowSelection={rowSelection} dataSource={data}>
    <Table.Column<ModTableData> key="name" dataIndex="name" title="Name" />
    <Table.Column<ModTableData> key="author" dataIndex="author" title="Author" />
  </Table>
);

export default ModTable;
