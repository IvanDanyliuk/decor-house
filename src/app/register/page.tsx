import RegisterForm from '@/components/forms/RegisterForm';
import Link from 'antd/es/typography/Link';
import React from 'react';


const Register: React.FC = () => {
  return (
    <div className='w-full'>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto text-5xl font-bold uppercase'>Register</h2>
      </section>
      <section className='container mx-auto py-10 box-border'>
        <RegisterForm />
        <div className='relative'>
          <Link 
            href='/' 
            className='absolute bottom-0 right-0 w-72 h-12 bg-accent-dark text-white text-center align-middle uppercase rounded'>GO BACK TO DASHBOARD</Link>
        </div>
      </section>
    </div>
  );
};

export default Register;