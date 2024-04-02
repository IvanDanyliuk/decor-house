'use client';

import { useState, useEffect } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { ArcElement, BarElement, CategoryScale, LinearScale, PointElement, Legend, LineElement, Chart, Tooltip } from 'chart.js';
import { DatePicker, Divider, Select } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { getStats } from '@/lib/queries/stats.queries';
import { generateColors } from '@/utils/helpers';
import { IFilterItem } from '@/lib/types/products.types';
import Loader from '../ui/Loader';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, PointElement, Legend, LineElement, Tooltip)


interface IStatsDetails {
  data: {
    categories: IFilterItem[];
    periodFrom: string;
    periodTo: string;
  }
}

interface IPeriod {
  from: string;
  to: string;
}

const StatsDetails: React.FC<IStatsDetails> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(data.categories[0].value);
  const [period, setPeriod] = useState<IPeriod>({ 
    from: data.periodFrom, 
    to: data.periodTo 
  });
  const [statsData, setStatsData] = useState<any | null>(null);

  const handleDateFromChange: DatePickerProps['onChange'] = (date, dateString) => {
    setPeriod({
      ...period,
      from: dayjs(date).toISOString()
    });
  };

  const handleDateToChange: DatePickerProps['onChange'] = (date, dateString) => {
    setPeriod({
      ...period,
      to: dayjs(date).toISOString()
    });
  };

  const setInitialPeriod = () => {
    setPeriod({
      from: data.periodFrom,
      to: data.periodTo
    });
  };

  useEffect(() => {
    getStats({ 
      categoryId: selectedCategory, 
      periodFrom: period.from, 
      periodTo: period.to 
    }).then(res => setStatsData(res));
  }, [selectedCategory, period]);

  if(!statsData) {
    return (
      <Loader />
    );
  }

  return (
    <div className='w-full'>
      <section className='w-full flex justify-between items-center'>
        <button type='button' onClick={setInitialPeriod} className='px-4 py-2 text-sm text-white bg-accent-dark rounded'>Clear period</button>
        <div className='flex gap-6'>
          <DatePicker onChange={handleDateFromChange} />
          <DatePicker onChange={handleDateToChange} />
        </div>
      </section>
      <Divider />
      <section className='w-full flex justify-between items-center'>
        <div className='border border-gray-medium rounded px-8 py-6'>
          <h3 className='mb-3 text-lg font-bold text-gray-dark'>Earnings</h3>
          <p className='text-2xl font-bold'>
            &euro;{statsData.total.earnings}
          </p>
        </div>
        <ul className='flex gap-6'>
          <li className='border border-gray-medium rounded px-8 py-6'>
            <h3 className='mb-3 text-lg font-semibold text-gray-dark'>Number of Orders</h3>
            <p className='text-2xl font-bold'>
              {statsData.total.ordersCount}
            </p>
          </li>
          <li className='border border-gray-medium rounded px-8 py-6'>
            <h3 className='mb-3 text-lg font-semibold text-gray-dark'>Average Bill</h3>
            <p className='text-2xl font-bold'>
              &euro;{statsData.total.averageBill}
            </p>
          </li>
          <li className='border border-gray-medium rounded px-8 py-6'>
            <h3 className='mb-3 text-lg font-semibold text-gray-dark'>Products Sold</h3>
            <p className='text-2xl font-bold'>
              {statsData.total.productsSold}
            </p>
          </li>
        </ul>
      </section>
      <Divider />
      <section className='w-full grid grid-cols-2 gap-6'>
        <div className='p-6 col-span-1 border rounded'>
          <h3 className='mb-6 text-lg font-semibold'>Orders Dynamic</h3>
          <Line 
            data={{
              labels: statsData!.ordersDynamic!.map((item: any) => dayjs(new Date(item._id.year, item._id.month - 1, item._id.day)).format('DD.MM.YYYY')),
              datasets: [
                {
                  label: 'EUR+',
                  fill: true,
                  data: statsData!.ordersDynamic.map((item: any) => item.totalAmount),
                  backgroundColor: '#F1F5FA',
                  borderColor: '#355a83ff',
                  pointBorderColor: '#26c8d0',
                }
              ]
            }} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  enabled: true,
                  intersect: false,
                  callbacks: {
                    label: (context: any) => {
                      let label = '';
                      if(context.parsed.y) {
                        label = context.parsed.y
                      }
                      return label;
                    }
                  }
                }
              },
            }}
            style={{ width: '100%' }}
          />
        </div>
        <div className='p-6 col-span-1 border rounded'>
          <h3 className='mb-6 text-lg font-semibold'>Sold products</h3>
          <div className='h-96 flex justify-center'>
            <Doughnut 
              data={{
                labels: statsData!.productsSold.map((item: any) => item.name),
                datasets: [
                  {
                    label: '%',
                    data: statsData!.productsSold.map((item: any) => item.percentage),
                    backgroundColor: generateColors(statsData!.productsSold!.length)
                  }
                ]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  },
                }
              }}
            />
          </div>
        </div>
        <div className='p-6 col-span-1 border rounded'>
          <div className='mb-6 w-full flex justify-between items-center'>
            <h3 className='text-lg font-semibold'>Sales per category</h3>
            <Select 
              options={data.categories} 
              value={selectedCategory}
              defaultValue={data.categories[0].value} 
              onChange={setSelectedCategory} 
              className='w-52'
            />
          </div>
          <Line 
            data={{
              labels: statsData!.salesPerCategory!.map((item: any) => dayjs(new Date(item._id.year, item._id.month - 1, item._id.day)).format('DD.MM.YYYY')),
              datasets: [
                {
                  label: 'EUR+',
                  fill: true,
                  data: statsData!.salesPerCategory.map((item: any) => item.amount),
                  backgroundColor: '#F1F5FA',
                  borderColor: '#355a83ff',
                  pointBorderColor: '#26c8d0',
                }
              ]
            }} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  enabled: true,
                  intersect: false,
                  callbacks: {
                    label: (context: any) => {
                      let label = '';
                      if(context.parsed.y) {
                        label = context.parsed.y
                      }
                      return label;
                    }
                  }
                }
              },
            }}
            style={{ width: '100%' }}
          />
        </div>
        <div className='p-6 col-span-1 border rounded'>
          <h3 className='mb-6 text-lg font-semibold'>Top categories</h3>
          <Bar 
            data={{
              labels: statsData.topCategories.map((item: any) => item._id),
              datasets: [
                {
                  label: 'EUR',
                  data: statsData.topCategories.map((item: any) => item.amount),
                  backgroundColor: generateColors(statsData!.productsSold!.length)
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  enabled: true,
                  intersect: false,
                  callbacks: {
                    label: (context: any) => {
                      let label = '';
                      if(context.parsed.y) {
                        label = context.parsed.y
                      }
                      return label;
                    }
                  }
                }
              },
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default StatsDetails;