'use client';

import { IOrder } from '@/lib/types/order.types';
import { IUser } from '@/lib/types/user.types';
import { useState } from 'react';
import UserTab from './UserTab';
import OrdersTab from './OrdersTab';


enum ProfileTabs {
  Profile = 'profile',
  Orders = 'orders'
}

interface IProfileDetails {
  data: {
    profile: IUser;
    orders: IOrder[];
  };
}


const ProfileDetails: React.FC<IProfileDetails> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<any>(ProfileTabs.Profile);

  const handleActiveTabChange = () => {
    if(activeTab === ProfileTabs.Profile) {
      setActiveTab(ProfileTabs.Orders);
    } else {
      setActiveTab(ProfileTabs.Profile);
    }
  };

  return (
    <div>
      <div className='profile-nav-container'>
        <button 
          onClick={handleActiveTabChange}
          className={`related-products-nav-btn ${activeTab === ProfileTabs.Profile ? 'btn-active' : ''}`}
        >
          Profile
        </button>
        <button 
          onClick={handleActiveTabChange}
          className={`related-products-nav-btn ${activeTab === ProfileTabs.Orders ? 'btn-active' : ''}`}
        >
          Orders History
        </button>
      </div>
      <div className='py-6'>
        {activeTab === ProfileTabs.Profile ? (
          <UserTab user={data.profile} />
        ) : (
          <OrdersTab orders={data.orders} />
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;