import { notification } from 'antd';
import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { NotificationType } from '@/lib/common.types';


export const openNotification = (title: string, description: string, type: NotificationType = NotificationType.Success) => {
  notification.open({
    message: title,
    description,
    icon: type === NotificationType.Success ? 
      <CheckOutlined className='text-green-500' /> : 
      <ExclamationCircleOutlined className='text-red-500' />,
  });
};