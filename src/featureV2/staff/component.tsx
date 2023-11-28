import { type DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { useContext, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { ContextModal } from '@/context/dialog';
import { Localize } from '@/context/languages';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { type IFilter } from '@/core2/table/request';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { EnumPath, From, Limit, OrderBy } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { type IFormInviteStaff } from './types';
import { ViewStaff } from './view';
interface IComponentStaff {
  apiListStaff: IApiRequest;
  apiInviteStaff: IApiRequest;
}
const payload: IFilter = {
  order: 'createdAt',
  by: OrderBy.DESC,
  from: From.DEFAULT,
  limit: Limit.DEFAULT,
};

const ComponentStaff = (props: IComponentStaff) => {
  const { apiListStaff, apiInviteStaff } = props;
  const [key, setKey] = useState<string>('');
  const { onSetView } = useContext(ContextModal);

  const [listGroup, setListGroup] = useState<IItemDataDropDown[]>([]);
  const [selectGroup, setSelectGroup] = useState<IItemDataDropDown>({ id: '', text: '' });
  const funcRequestCreateGroup = {
    handleRequestSuccess: (data: any) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='staff.checkYourMessageOnYourPhone' />, { autoClose: 3000 });
        const anchor = document.createElement('a');
        anchor.href = `${EnumPath.GROUP_STAFF_INVITE_STAFF}?token=${data?.token}`;
        anchor.target = '_blank';
        anchor.click();
        // navigate(`${EnumPath.GROUP_STAFF_DETAIL}/${params?.groupStaffId}`);
      } catch (error) {}
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
  const { isLoading, mutate } = useRequest(apiInviteStaff, funcRequestCreateGroup);
  const handleSubmitInviteStaff = (data: Record<string, IFormInviteStaff>) => {
    mutate({
      groupStaffId: selectGroup.id,
      name: data.name,
      phone: data.phone,
    });
  };
  const onRequestSuccessListGroup = (data: any) => {
    if (!Helper.isEmpty(data.list)) {
      const list: IItemDataDropDown[] = data.list.map((item: any) => ({
        id: item.groupStaffId,
        text: item.name,
      }));
      setSelectGroup(list[0]);
      setListGroup(list);
    }
  };
  const onChangeSelectGroup = (event: DropDownListChangeEvent) => {
    setSelectGroup(event.value);
    setKey(Helper.randomKey());
  };
  return (
    <ViewStaff
      setKey={setKey}
      onSetView={onSetView}
      selectGroup={selectGroup}
      onChangeSelectGroup={onChangeSelectGroup}
      listGroup={listGroup}
      onRequestSuccessListGroup={onRequestSuccessListGroup}
      isLoading={isLoading}
      handleSubmitInviteStaff={handleSubmitInviteStaff}
      keyView={key}
      apiListStaff={apiListStaff}
      payload={payload}
    />
  );
};

export { ComponentStaff };
