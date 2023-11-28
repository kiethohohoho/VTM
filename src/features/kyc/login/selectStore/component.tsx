import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import AuthService, { type IAuth } from '@/utils/Auth';
import { EnumPath, STATUS_STORE } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import { type VIEW_LOGIN } from '../login.interface';
import { type IStore, SelectStoreView } from './view';

interface ISelectStoreComponent {
  apiSelectStore: IApiRequest;
  listStore: IStore[];
  handleChangeView: (step: VIEW_LOGIN) => void;
}

const SelectStoreComponent: FC<ISelectStoreComponent> = ({ apiSelectStore, listStore, handleChangeView }) => {
  const navigate = useNavigate();
  const [storeId, setStoreId] = useState<string>();
  const funcRequestSelectStore = {
    handleRequestSuccess: (data: IAuth) => {
      try {
        const profiles = AuthService.getPackageProfile();
        AuthService.setAllPackage(data, { ...profiles, storeId });
        navigate(EnumPath.HOME);
      } catch (error: any) {
        LoggerService.error(
          'SelectRoleComponent execute handleRequestSuccess in funcRequestSelectRole receive error',
          error,
        );
      }
    },
  };
  const { mutate, isLoading } = useRequest(apiSelectStore, funcRequestSelectStore);

  const handleSelectStore = (storeId: string, storeStatus: STATUS_STORE) => {
    try {
      LoggerService.info('SelectRoleComponent execute handleSelectRole');
      if (storeId && storeStatus !== STATUS_STORE.ACTIVE) {
        toastDefault(ENUMS_TOAST.WARNING, <Localize tid={'account.store.notApproved'} />);
        return null;
      }

      setStoreId(storeId);
      const payload = {
        storeId,
      };
      mutate(payload);
    } catch (error: any) {
      LoggerService.error('SelectRoleComponent execute handleSelectRole receive error', error.toString());
    }
  };
  return (
    <SelectStoreView
      loading={isLoading}
      listStore={listStore}
      handleSelectStore={handleSelectStore}
      handleChangeView={handleChangeView}
    />
  );
};

export { SelectStoreComponent };
