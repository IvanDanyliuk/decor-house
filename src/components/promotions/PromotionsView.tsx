'use client';

import { MouseEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Divider } from 'antd';
import { getPromotions } from '@/lib/queries/promotion.queries';
import { IPromotion } from '@/lib/types/propmotions.types';
import { countPromotionDaysLeft, formatPromotionPeriod } from '@/utils/helpers';
import { DISABLED_ARROW_COLOR } from '@/lib/constants';


enum PromotionTabs {
  Current = 'current',
  Past = 'past',
  All = 'all'
}


const PromotionsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(PromotionTabs.Current);
  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const [promotionsCount, setPromotionsCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const handleActiveTabChange = (e: MouseEvent<HTMLButtonElement>) => {
    setPage(1);
    setActiveTab(e.currentTarget.name);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    getPromotions({ page, itemsPerPage: 10, period: activeTab })
      .then(res => {
        setPromotions(res.data.promotions);
        setPromotionsCount(res.data.count);
      });
  }, [page, activeTab]);

  return (
    <div className='w-full'>
      <div className='w-full bg-main-bg'>
        <div className='container mx-auto promotions-nav-container'>
          <button 
            name={PromotionTabs.Current}
            onClick={handleActiveTabChange}
            className={`${activeTab === PromotionTabs.Current ? 'promotions-nav-btn-active' : 'promotions-nav-btn'}`}
          >
            Current
          </button>
          <button 
            name={PromotionTabs.Past}
            onClick={handleActiveTabChange}
            className={`${activeTab === PromotionTabs.Past ? 'promotions-nav-btn-active' : 'promotions-nav-btn'}`}
          >
            Past
          </button>
          <button 
            name={PromotionTabs.All}
            onClick={handleActiveTabChange}
            className={`${activeTab === PromotionTabs.All ? 'promotions-nav-btn-active' : 'promotions-nav-btn'}`}
          >
            All
          </button>
        </div>
      </div>
      <div className='py-6 container mx-auto'>
        <ul>
          {promotions.map((promotion, i) => (
            <li key={crypto.randomUUID()}>
              <Link href={`/promotions/${promotion._id!}`} className='flex gap-6'>
                <div className='relative w-1/4 h-72'>
                  <Image 
                    src={promotion.image} 
                    alt={promotion._id!} 
                    quality={100}
                    className='w-full h-full object-cover'
                    fill 
                  />
                </div>
                <div className='w-full flex flex-col justify-between'>
                  <div>
                    <p className='text-xs text-gray-dark'>
                      {formatPromotionPeriod(promotion.periodFrom, promotion.periodTo)}
                    </p>
                    <h5 className='my-3 text-xl font-semibold uppercase'>
                      {promotion.title}
                    </h5>
                    <Divider className='my-3' />
                    <p className='text-gray-dark'>
                      {promotion.description}
                    </p>
                  </div>
                  <div className='px-4 py-3 text-center font-semibold bg-main-bg rounded'>
                    {countPromotionDaysLeft(promotion.periodTo)}
                  </div>
                </div>
              </Link>
              {i !== promotions.length - 1 && <Divider />}
            </li>
          ))}
        </ul>
        <div className='flex justify-end'>
          <div className='my-6 flex gap-8'>
            <button 
              type='button' 
              disabled={page === 1}
              onClick={handlePreviousPage}
            >
              <Image 
                src='/assets/icons/left-arrow.svg'
                alt='previous'
                width={30}
                height={30}
                style={{ 
                  filter: page === 1 ? DISABLED_ARROW_COLOR : '' 
                }}
              />
            </button>
            <button 
              type='button' 
              disabled={page * 10 >= promotionsCount }
              onClick={handleNextPage}
            >
              <Image
                src='/assets/icons/right-arrow.svg'
                alt='next'
                width={30}
                height={30}
                style={{ 
                  filter: page * 10 >= promotionsCount ? DISABLED_ARROW_COLOR : '' 
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsView;