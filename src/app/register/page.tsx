import RegisterForm from '@/components/forms/RegisterForm';


const Register: React.FC = () => {
  return (
    <div className='w-full'>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>Register</h2>
      </section>
      <section className='container mx-auto py-10 box-border'>
        <RegisterForm />
      </section>
    </div>
  );
};

export default Register;