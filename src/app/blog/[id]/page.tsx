import Image from 'next/image';
import { Divider } from 'antd';
import { getPost } from '@/lib/queries/post.queries';
import { formatDate } from '@/utils/helpers';


const Post = async ({ params }: { params: { id: string } }) => {
  const postData = await getPost(params.id);

  if(!postData.data) {
    return (
      <div className='w-full h-full grow flex justify-center items-center'>
        <p className='text-center text-gray-dark font-bold'>Cannot find a post</p>
      </div>
    );
  }

  return (
    <div className='relative container mx-auto'>
      <div className='relative w-full h-72 md:h-[80vh]'>
        <Image 
          src={postData.data.image} 
          alt={postData.data._id!} 
          quality={100}
          className='w-full h-full object-cover'
          fill 
        />
      </div>
      <div className='py-6 flex-1'>
        <h1 className='mb-6 text-3xl text-center font-bold uppercase'>
          {postData.data.title}
        </h1>
        <div className='w-full flex justify-between items-center gap-10'>
          <p className='w-52 text-center md:text-left text-gray-dark font-semibold'>
            {formatDate(postData.data.createdAt)}
          </p>
          <ul className='flex flex-wrap gap-3'>
            {postData.data.tags.map((tag: any) => (
              <li 
                key={crypto.randomUUID()} 
                className='px-3 py-2 text-xs md:text-sm bg-main-bg'
              >
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
        <Divider className='my-3' />
        <p className='py-3 text-gray-dark'>
          {postData.data.content}
        </p>
      </div>
    </div>
  );
};

export default Post;