import Link from 'next/link';
import { LoginOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import NavMenu from '../navigation/NavMenu';
import Search from './Search';
import UserMenu from '../navigation/UserMenu';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { getServerSession } from 'next-auth';
import CartIcon from '../cart/CartIcon';


const Header: React.FC = async () => {
  const session = await getServerSession();
  const currentUser = await getCurrentUser(session?.user?.email!);

  return (
    <header className='w-full h-24 flex items-center'>
      <div className='container mx-auto flex justify-between'>
        <div className='flex items-center gap-6'>
          <NavMenu />
          <Link href='/' className='text-2xl font-bold text-accent-dark'>Decor House</Link>
        </div>
        <div className='flex items-center gap-6'>
          <Search />
          {/* <Link href='/cart' className='flex items-center gap-1'>
            <ShoppingCartOutlined style={{ fontSize: '20px' }} />
            <span>{`(${3})`}</span>
          </Link> */}
          <CartIcon />
          {
            currentUser.data ? (
              <UserMenu user={currentUser.data} />
            ) : (
              <Link href='/login' className='flex gap-1'>
                <LoginOutlined />
                <span className='text-sm'>Sign In</span>
              </Link>
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Header;