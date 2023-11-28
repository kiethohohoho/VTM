import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';

import { type VIEW_LOGIN } from '../login.interface';
import { SelectStoreComponent } from './component';
import { type IStore } from './view';
const config = new Config().getState();

interface ISelectStore {
  token?: string;
  listStore: IStore[];
  handleChangeView: (step: VIEW_LOGIN) => void;
}
const SelectStore = (props: ISelectStore) => {
  const { token, ...rest } = props;
  const apiSelectStore: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.kyc.selectStore,
    headers: {
      token,
    },
  };

  return (
    <SelectStoreComponent
      apiSelectStore={apiSelectStore}
      {...rest}
    />
  );
};
export { SelectStore };
