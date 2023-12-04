'use client';

import { UploadButton } from '../../utils/uploadthing';
import { UploaderEndpoint } from '@/lib/common.types';


interface UploadImageButtonProps {
  endpoint: UploaderEndpoint;
  setImageUrl: (url: string) => void;
}


const UploadImageButton: React.FC<UploadImageButtonProps> = ({ endpoint, setImageUrl }) => {
  return (
    <div className='w-full flex items-start'>
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