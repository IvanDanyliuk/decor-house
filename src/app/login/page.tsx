import Image from 'next/image';
import Link from 'next/link';
import { Divider } from 'antd';
import LoginForm from '@/components/forms/LoginForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AuthButton from '@/components/ui/AuthButton';


const Login: React.FC = async () => {
  const session = await getServerSession(authOptions);
  
  return (
    <div className='w-full'>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>Login</h2>
      </section>
      <section className='container mx-auto max-w-md py-10 box-border'>
        <LoginForm />
        <Divider>or</Divider>
        <div className='my-10'>
          <AuthButton session={session} />
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