import { type IApiRequest } from '@/api/api.interface';
import { useLogout } from '@/api/api.middleware';
import AuthService from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

import LogoutView from './view';
interface LogoutComponentProps {
  content?: string;
}
export const LogoutComponent = ({ content }: LogoutComponentProps) => {
  const auth = AuthService.getPackageAuth();
  console.log('auth', auth);
  const apiLogout: IApiRequest = {
    method: 'delete',
    url: 'https://api-vtm.intelin.vn/auth/login',
    headers: {
      'Content-Type': 'application/json',
      'device-id': auth?.deviceID,
      checking: 'aaaa11111a',
      token: auth?.token,
    },
  };

  const funcLogout = {
    handleLogoutSuccess: () => {
      try {
        console.log('Logout success');
      } catch (error: any) {
        LoggerService.error('ComponentLogout execute handleLogoutSuccess in funcLogout receive error', error);
      }
    },
    handleLogoutFalse: () => {
      try {
        console.log('Logout false');
      } catch (error: any) {
        LoggerService.error('ComponentLogout execute handleLogoutFalse in funcLogout receive error', error);
      }
    },
  };

  const { mutate } = useLogout(apiLogout, funcLogout);
  const handleLogout = () => {
    mutate({});
    AuthService.handleLogout();
  };
  return (
    <LogoutView
      content={content}
      onLogout={handleLogout}
    />
  );
};
