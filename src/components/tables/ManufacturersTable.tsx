'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

interface IManufacturersTable {
  manufacturers: {
    _id: string;
    name: string;
    country: string;
  }[];
}

const ManufacturersTable: React.FC<IManufacturersTable> = ({ manufacturers }) => {
  return (
    <div>ManufacturersTable</div>
  );
};

export default ManufacturersTable;