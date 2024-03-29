import Image from 'next/image';


const About = () => {
  return (
    <div className='relative w-full'>
      <section className='py-8 w-full bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary text-center'>
          About us
        </h2>
      </section>
      <section className='container mx-auto py-6 relative flex flex-col-reverse md:flex-row gap-6 md:gap-10'>
        <div className='flex-1'>
          <p className='text-gray-dark'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur ipsam amet pariatur, voluptates 
            reprehenderit qui laboriosam ullam repudiandae laudantium facere molestiae exercitationem architecto 
            velit distinctio eum, dolorem, accusamus natus temporibus. Aut impedit tempore odio eos blanditiis 
            eligendi commodi dignissimos, alias officiis ratione, modi rerum laboriosam, debitis tempora quidem 
            voluptatem ipsum!
          </p>
          <p className='text-gray-dark'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi laborum velit consequatur eligendi, 
            eaque veniam quidem, quas consectetur dicta minus at voluptatum ipsam? Quas autem a minus porro 
            consequatur quam.
          </p>
          <p className='text-gray-dark'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt fuga dolores vel sapiente aspernatur 
            tenetur quia at labore earum, necessitatibus magni ipsam laudantium quos voluptate beatae natus corrupti 
            eaque. Quam temporibus ad ipsa ab quo, reprehenderit cupiditate quis atque repellendus, in accusamus. 
            Sit sapiente est corrupti quas, aut aspernatur ut.
          </p>
          <p className='text-gray-dark'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi laborum velit consequatur eligendi, 
            eaque veniam quidem, quas consectetur dicta minus at voluptatum ipsam? Quas autem a minus porro 
            consequatur quam.
          </p>
          <p className='text-gray-dark'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt fuga dolores vel sapiente aspernatur 
            tenetur quia at labore earum, necessitatibus magni ipsam laudantium quos voluptate beatae natus corrupti 
            eaque. Quam temporibus ad ipsa ab quo, reprehenderit cupiditate quis atque repellendus, in accusamus. 
            Sit sapiente est corrupti quas, aut aspernatur ut.
          </p>
        </div>
        <div className='relative w-full md:w-1/2 h-[50vh]'>
          <Image 
            src='/assets/images/top-quality.png' 
            alt='about-us' 
            quality={100}
            className='w-full h-full object-cover'
            fill
          />
        </div>
      </section>
    </div>
  );
};

export default About;