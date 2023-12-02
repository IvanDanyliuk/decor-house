import Image from 'next/image';
import Link from 'next/link';
import { Divider } from 'antd';
import LoginForm from '@/components/forms/LoginForm';


const Login: React.FC = () => {
  return (
    <div className='w-full'>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>Login</h2>
      </section>
      <section className='container mx-auto max-w-md py-10 box-border'>
        <LoginForm />
        <Divider>or</Divider>
        <div className='my-10'>
          <button className='mx-auto w-full h-12 flex justify-center items-center gap-3 border border-gray-light rounded'>
            <Image src='/assets/images/google-icon-logo.svg' alt='Google' width={20} height={20} />
            <span className='text-sm'>Sign In with Google</span>
          </button>
        </div>
        <Divider />
        <div className='text-center'>
          <span>Do not have an account?</span>
          <Link href='/register' className='ml-1 font-semibold underline'>Register</Link>
        </div>
      </section>
    </div>
  );
};

export default Login;