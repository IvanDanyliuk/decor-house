import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { LoginOutlined } from '@ant-design/icons';
import NavMenu from '../navigation/NavMenu';
import Search from './Search';
import UserMenu from '../navigation/UserMenu';
import CartIcon from '../cart/CartIcon';
import { getCurrentUser } from '@/lib/queries/user.queries';


const Header: React.FC = async () => {
  const session = await getServerSession();
  const user = session?.user ? await getCurrentUser(session?.user?.email!) : null;
  
  return (
    <header className='sticky top-0 px-3 w-full h-24 flex items-center bg-white z-50'>
      <div className='container mx-auto flex justify-between'>
        <div className='flex items-center gap-6'>
          <NavMenu user={user} />
          <Link href='/' className='text-2xl font-bold text-accent-dark'>Decor House</Link>
        </div>
        <div className='flex items-center gap-6'>
          <div className='hidden md:flex md:items-center md:gap-6'>
            <Search />
            <CartIcon user={user} />
          </div>
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