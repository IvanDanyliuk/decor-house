import Link from 'next/link';
import type { Metadata } from 'next';
import { Divider } from 'antd';
import LoginForm from '@/components/forms/LoginForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import AuthButton from '@/components/ui/AuthButton';


export const metadata: Metadata = {
  title: 'Login',
  description: 'Decor House is a company that sells high-quality furniture and accessories'
}


const Login: React.FC = async () => {
  const session = await getServerSession(authOptions);
  
  return (
    <div className='w-full'>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto px-3 md:px-0 page-heading-primary'>Login</h2>
      </section>
      <section className='container mx-auto px-3 md:px-0 max-w-md py-10 box-border'>
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