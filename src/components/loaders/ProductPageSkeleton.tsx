import { Skeleton } from 'antd';


const ProductPageSkeleton: React.FC = () => {
  return (
    <div className='mx-auto container'>
      <div className='relative w-full flex gap-6'>
        <Skeleton.Image active className='w-full h-96 flex-1' />
        <div className='relative w-full flex flex-1 flex-col gap-3'>
          <Skeleton.Node active className='w-1/2 h-12' />
          <Skeleton.Node active className='w-1/2 h-12' />
          <Skeleton.Node active className='w-full h-12' />
          <div className='my-6 flex gap-6'>
            <Skeleton.Button active className='flex-1' />
            <Skeleton.Button active className='flex-1' />
          </div>
          <Skeleton.Node active className='w-full' />
          <Skeleton.Node active className='w-full' />
        </div>
      </div>
      <div className='w-full flex gap-6'>
        
      </div>
    </div>
  );
};

export default ProductPageSkeleton;