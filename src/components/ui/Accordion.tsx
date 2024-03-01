import { ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DownOutlined } from '@ant-design/icons';


interface IAccordion {
  title: string | ReactNode;
  children: ReactNode;
}

const Accordion: React.FC<IAccordion> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleAccordionExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={{ backgroundColor: isExpanded ? '#F1F5FA' : 'white' }}
        onClick={handleAccordionExpanded}
        className='relative px-2 py-3 w-full flex justify-between items-center gap-10 text-base font-semibold'
      >
        <div className='flex-1'>{title}</div>
        <DownOutlined />
      </motion.div>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.section
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Accordion;