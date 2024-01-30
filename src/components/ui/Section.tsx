'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';


interface ISection {
  children: ReactNode;
  [props: string]: any;
}


const Section: React.FC<ISection> = ({ children, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if(isInView) {
      mainControls.start('visible');
    }
  }, [isInView]);
  
  return (
    <motion.section ref={ref} className='w-full'>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial='hidden'
        animate={mainControls}
        transition={{
          duration: 0.5, delay: 0.25
        }} 
        {...props}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export default Section;