'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getInteriors } from '@/lib/queries/interior.queries';
import { IInterior } from '@/lib/types/interior.types';


const InteriorsView: React.FC = () => {
  const [interiors, setInteriors] = useState<IInterior[]>([]);
  const [interiorsCount, setInteriorsCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getInteriors({ page, itemsPerPage: 9 })
      .then(res => {
        setInteriors([...interiors, ...res.data.interiors]);
        setInteriorsCount(res.data.count);
      })
  }, [page]);

  return (
    <div>
      <ul className='py-3 md:py-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
        {interiors.map(interior => (
          <li key={crypto.randomUUID()} className='relative col-span-1'>
            <Link href={`/interiors/${interior._id!}`}>
              <div className='w-full h-[30vh] overflow-hidden'>
                <motion.div 
                  className='relative w-full h-full'
                  whileHover={{ scale: 1.1 }}
                >
                  <Image 
                    src={interior.image} 
                    alt={interior._id!} 
                    quality={100}
                    className='w-full h-full object-cover'
                    fill
                  />
                </motion.div>
              </div>
              <div className='py-3 flex justify-between items-center gap-6'>
                <p className='text-lg font-semibold uppercase'>
                  {interior.title}
                </p>
                <Image
                  src='/assets/icons/right-arrow.svg'
                  alt='next'
                  width={30}
                  height={30}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {interiorsCount > interiors.length && (
        <button 
          onClick={(e) => {
            e.preventDefault()
            setPage(page + 1)
          }}
          className='w-full block mx-auto my-8 md:w-80 px-4 py-2 text-base font-semibold border border-accent-dark rounded-md'
        >
          View More
        </button>
      )}
    </div>
  );
};

export default InteriorsView;