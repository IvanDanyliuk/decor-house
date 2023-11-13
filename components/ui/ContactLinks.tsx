import React from 'react';
import Link from 'next/link';
import { FacebookFilled, InstagramFilled, MailOutlined, PhoneFilled } from '@ant-design/icons';


const ContactLinks: React.FC = () => {
  return (
    <ul className='flex items-center gap-6'>
      <li>
        <Link href='/'>
          <PhoneFilled style={{ fontSize: '20px' }} />
        </Link>
      </li>
      <li>
        <Link href='mailto:info@decorhouse.com'>
          <MailOutlined style={{ fontSize: '20px' }} />
        </Link>
      </li>
      <li>
        <Link href='/'>
          <FacebookFilled style={{ fontSize: '20px' }} />
        </Link>
      </li>
      <li>
        <Link href='/'>
          <InstagramFilled style={{ fontSize: '20px' }} />
        </Link>
      </li>
    </ul>
  );
};

export default ContactLinks;