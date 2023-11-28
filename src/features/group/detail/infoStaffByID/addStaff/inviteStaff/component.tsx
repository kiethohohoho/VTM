import { type FunctionComponent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { EnumPath } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface CreateGroupStaffComponentProps {
  api: IApiRequest;
}
export interface IPayload {
  groupStaffId: string | undefined;
  name: string;
  phone: string;
}

const CreateGroupStaffComponent: FunctionComponent<CreateGroupStaffComponentProps> = props => {
  const navigate = useNavigate();
  const params = useParams();
  const { api } = props;

  const callbackFunc = {
    handleRequestSuccess: (data: any) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='staff.checkYourMessageOnYourPhone' />, { autoClose: 3000 });
        const anchor = document.createElement('a');
        anchor.href = `${EnumPath.GROUP_STAFF_INVITE_STAFF}?token=${data?.token}`;
        anchor.target = '_blank';
        anchor.click();
        navigate(`${EnumPath.GROUP_STAFF_DETAIL}/${params?.groupStaffId}`);
        LoggerService.debug('ListComponent execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestPhoneExisted: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid='groupStaff.existedPhone' />);

        LoggerService.info('ListComponent execute handleRequestPhoneExisted receive list');
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestError receive error', error);
      }
    },
  };

  const handleSubmit = (dataItem: Record<string, any>) => {
    const payload: IPayload = {
      name: dataItem.name,
      groupStaffId: params?.groupStaffId,
      phone: dataItem.phone,
    };
    mutate(payload);
  };
  const { isLoading, mutate } = useRequest(api, callbackFunc);

  return (
    <View
      handleSubmit={handleSubmit}
      loading={isLoading}
    />
  );
};

export default CreateGroupStaffComponent;
