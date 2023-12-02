import { Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import { signOut } from 'next-auth/react';


interface IUserMenuProps {
  user: {
    _id: string;
    name: string;
    photo: string;
    role: string;
    phone: string;
  };
}


const userItems: MenuProps['items'] = [
  {
    label: <Link href='/profile'>Profile</Link>,
    key: '0',
  },
  {
    label: <Link href='/orders'>My Orders</Link>,
    key: '1',
  },
  {
    label: <button onClick={() => signOut()}>Sign Out</button>,
    key: '2',
  },
];

const adminItems: MenuProps['items'] = [
  {
    label: <Link href='/profile'>Profile</Link>,
    key: '0',
  },
  {
    label: <Link href='/orders'>My Orders</Link>,
    key: '1',
  },
  {
    label: <Link href='/dashboard'>Dashboard</Link>,
    key: '2',
  },
  {
    label: <button onClick={() => signOut()}>Sign Out</button>,
    key: '3',
  },
];


const UserMenu: React.FC<IUserMenuProps> = ({ user }) => {
  console.log(user)
  return (
    <Dropdown 
      menu={{ items: user.role === 'admin' ? adminItems : userItems }} 
      trigger={['click']}
    >
      <button className='flex items-center gap-1'>
        <Avatar src={user.photo} />
        <span>{user.name}</span>
      </button>
    </Dropdown>
  )
}

export default UserMenu