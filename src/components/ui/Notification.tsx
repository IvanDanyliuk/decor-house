import { notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


export const openNotification = (title: string, description: string) => {
  notification.open({
    message: title,
    description,
    icon: <ExclamationCircleOutlined className='text-red-500' />,
  });
};