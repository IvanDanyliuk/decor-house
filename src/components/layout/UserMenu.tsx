import React from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';


const items: MenuProps['items'] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];


const UserMenu: React.FC = () => {
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <button>

      </button>
    </Dropdown>
  )
}

export default UserMenu