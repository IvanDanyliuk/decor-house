import { LoadingOutlined } from '@ant-design/icons';


const Loader: React.FC = () => {
  return (
    <div className='w-full py-72 flex justify-center items-center'>
      <LoadingOutlined className='text-xl' />
    </div>
  );
};

export default Loader;