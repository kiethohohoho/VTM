import { type FC } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import AuthService, { type IAuth } from '@/utils/Auth';
import { EnumUserRole } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { VIEW_LOGIN } from '../login.interface';
import { type IStore } from '../selectStore/view';
import { SelectRoleView } from './view';

interface ISelectRoleComponent {
  apiSelectRole: IApiRequest;
  handleChangeView: (step: VIEW_LOGIN) => void;
  handleSetSelectStoreToken: (token: string) => void;
  handleSetListStore: (listStore: IStore[]) => void;
}

const SelectRoleComponent: FC<ISelectRoleComponent> = ({
  apiSelectRole,
  handleChangeView,
  handleSetSelectStoreToken,
  handleSetListStore,
}) => {
  const profileDetails = AuthService.getPackageProfile();
  const funcRequestSelectRole = {
    handleRequestSuccess: (data: IAuth) => {
      try {
        if (Helper.isEmpty(data.profileDetails.listStore)) {
          toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid={'account.loginSuccess'} />);
          AuthService.setAllPackage(data, data.profileDetails);
        } else {
          handleSetListStore(data.profileDetails.listStore);
          handleSetSelectStoreToken(data.token);
          handleChangeView(VIEW_LOGIN.SELECT_STORE);
        }
      } catch (error: any) {
        LoggerService.error(
          'SelectRoleComponent execute handleRequestSuccess in funcRequestSelectRole receive error',
          error,
        );
      }
    },
  };
  const { mutate, isLoading } = useRequest(apiSelectRole, funcRequestSelectRole);

  const handleSelectRole = (role: number) => {
    try {
      LoggerService.info('SelectRoleComponent execute handleSelectRole');
      if (!profileDetails.isApproved && role === EnumUserRole.RETAILER) {
        toastDefault(ENUMS_TOAST.WARNING, <Localize tid={'account.retailer.notApproved'} />);
        return null;
      }
      if (!profileDetails.isApprovedBrand && role === EnumUserRole.BRAND) {
        toastDefault(ENUMS_TOAST.WARNING, <Localize tid={'account.branch.notApproved'} />);
        return null;
      }
      const payload = {
        role,
      };
      mutate(payload);
    } catch (error: any) {
      LoggerService.error('SelectRoleComponent execute handleSelectRole receive error', error.toString());
    }
  };
  return (
    <SelectRoleView
      loading={isLoading}
      profileDetails={profileDetails}
      handleSelectRole={handleSelectRole}
    />
  );
};

export { SelectRoleComponent };
