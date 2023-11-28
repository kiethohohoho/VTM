import React from 'react';
import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useLogout } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { TYPE_DIALOG, TYPE_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import AuthService from '@/utils/Auth';
import { EnumPath } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import ViewPersonal from './view';
interface IStatePopupPersonal {
  show: boolean;
}
const initialStatePopupPersonal: IStatePopupPersonal = {
  show: false,
};

interface IComponentPersonal {
  api: IApiRequest;
}
const ComponentPersonal: React.FC<IComponentPersonal> = ({ api }) => {
  const [statePopup, setStatePopup] = React.useState<IStatePopupPersonal>(initialStatePopupPersonal);
  const navigate = useNavigate();
  const profile = AuthService.getPackageProfile();

  const { onSetView } = React.useContext(ContextModal);

  const funcRequest = {
    handleRequestSuccess: (data: any) => {
      try {
        LoggerService.debug('ListComponent execute handleRequestSuccess receive list', data);
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid={'logout.success'} />);
        AuthService.handleLogout();
        navigate(EnumPath.LOGIN);
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleExpireTokenLogout: () => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid={'logout.success'} />);
        AuthService.handleLogout();
        navigate(EnumPath.LOGIN);
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestError receive error', error);
      }
    },
  };
  const { mutate } = useLogout(api, funcRequest);

  const handleLogout = () => {
    try {
      console.log('handleLogout');
      onSetView({
        typeDialog: TYPE_DIALOG.CONFIRM,
        typeModel: TYPE_MODAL.CONFIRM,
        contentDialog: (
          <div className='p-4'>
            <Localize tid={'logout.content'} />
          </div>
        ),
        titleDialog: 'logout.title',
        confirmButton: {
          label: 'logout.buttonConfirm',
        },
        onSubmit: () => {
          mutate({});
        },
      });
    } catch (error: any) {
      LoggerService.error('ProfileComponent execute handleLogout', error.toString());
    }
  };

  const handleTogglePopupPersonal = () => {
    setStatePopup(prev => {
      return {
        show: !prev.show,
      };
    });
  };
  const handleRedirect = (path: string) => {
    navigate(path);
    setStatePopup(prev => {
      return {
        show: !prev.show,
      };
    });
  };

  return (
    <ViewPersonal
      profile={profile}
      onLogout={handleLogout}
      onRedirect={handleRedirect}
      onTogglePopup={handleTogglePopupPersonal}
      show={statePopup.show}
    />
  );
};

export default ComponentPersonal;
