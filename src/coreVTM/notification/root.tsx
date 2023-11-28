import { notification } from 'antd';

interface NotificationRootAntDProps {
  message: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  duration?: number;
  className?: string;
  icon?: React.ReactNode;
}
const NotificationRootAntD = (props: NotificationRootAntDProps) => {
  const { message, icon, className, description, type = 'error', duration = 4.5, placement = 'topRight' } = props;
  notification[type]({
    message,
    description,
    duration,
    placement,
    className,
    icon,
  });
};

export default NotificationRootAntD;
