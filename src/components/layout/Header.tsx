import Link from 'next/link';
import { LoginOutlined } from '@ant-design/icons';
import NavMenu from '../navigation/NavMenu';
import Search from './Search';
import UserMenu from '../navigation/UserMenu';
import { getServerSession } from 'next-auth';
import CartIcon from '../cart/CartIcon';
import { getCurrentUser } from '@/lib/queries/user.queries';


const Header: React.FC = async () => {
  const session = await getServerSession();
  const user = session?.user ? await getCurrentUser(session?.user?.email!) : null;

  return (
    <header className='w-full h-24 flex items-center'>
      <div className='container mx-auto flex justify-between'>
        <div className='flex items-center gap-6'>
          <NavMenu />
          <Link href='/' className='text-2xl font-bold text-accent-dark'>Decor House</Link>
        </div>
        <div className='flex items-center gap-6'>
          <Search />
          <CartIcon user={user} />
          {
            user ? (
              <UserMenu user={user} />
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