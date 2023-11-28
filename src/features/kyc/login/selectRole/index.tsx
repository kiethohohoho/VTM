import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';

import { type VIEW_LOGIN } from '../login.interface';
import { type IStore } from '../selectStore/view';
import { SelectRoleComponent } from './component';
const config = new Config().getState();

interface ISelectRole {
  token?: string;
  handleChangeView: (step: VIEW_LOGIN) => void;
  handleSetSelectStoreToken: (token: string) => void;
  handleSetListStore: (listStore: IStore[]) => void;
}
const SelectRole = (props: ISelectRole) => {
  const { token, ...rest } = props;
  if (!token) return null;
  const apiSelectRole: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.kyc.login,
    headers: {
      token,
    },
  };

  return (
    <SelectRoleComponent
      apiSelectRole={apiSelectRole}
      {...rest}
    />
  );
};
export { SelectRole };
