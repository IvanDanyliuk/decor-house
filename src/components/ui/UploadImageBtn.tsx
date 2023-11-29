'use client';

import { UploadButton } from '../../utils/uploadthing';
import { UploaderEndpoint } from '@/lib/common.types';


interface UploadImageButtonProps {
  label: string;
  endpoint: UploaderEndpoint;
  setImageUrl: (url: string) => void;
}


const UploadImageButton: React.FC<UploadImageButtonProps> = ({ label, endpoint, setImageUrl }) => {
  return (
    <div className='w-full flex items-center gap-3'>
      <div className='w-36 text-sm font-semibold'>{label}</div>
      <UploadButton
        endpoint={endpoint}
        appearance={{
          button: {
            height: '2.5rem',
            background: '#458398'
          },
          container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-center',
          }
        }}
        onClientUploadComplete={(res) => {
          if(res) {
            setImageUrl(res[0].url)
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default UploadImageButton;