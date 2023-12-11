'use client'

import { Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useState, useEffect } from 'react';


interface IManufacturersTable {
  manufacturers: {
    _id: string;
    name: string;
    country: string;
  }[];
}


const ManufacturersTable: React.FC<IManufacturersTable> = ({ manufacturers }) => {
  return (
    <Table dataSource={manufacturers} pagination={false}>
      <Column title='ID' dataIndex='_id' key='_id' />
      <Column title='Name' dataIndex='name' key='name' />
      <Column title='Country' dataIndex='country' key='country' />

    </Table>
  );
};

export default ManufacturersTable;