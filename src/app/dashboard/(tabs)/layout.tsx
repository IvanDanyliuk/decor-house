import { ReactNode } from 'react';
import DashboardMenu from '@/components/navigation/DashboardMenu';


interface IDashboardLayoutProps {
  children: ReactNode;
}


const Layout: React.FC<IDashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className='w-full py-10 bg-main-bg'>
        <h2 className='px-3 md:px-0 container mx-auto page-heading-primary'>Dashboard</h2>
      </div>
      <div className='container mx-auto px-3'>
        <div className='py-3'>
          <DashboardMenu />
        </div>
        <div className='md:py-3'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;