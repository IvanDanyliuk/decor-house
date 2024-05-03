import type { Metadata } from 'next';
import RegisterForm from '@/components/forms/RegisterForm';


export const metadata: Metadata = {
  title: 'Register | Decor House',
  description: 'Decor House is a company that sells high-quality furniture and accessories'
}


const Register: React.FC = () => {
  return (
    <div className='w-full'>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto px-3 md:px-0 page-heading-primary'>Register</h2>
      </section>
      <section className='container mx-auto px-3 md:px-0 py-10 box-border'>
        <RegisterForm />
      </section>
    </div>
  );
};

export default Register;