import { type DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';

import { type IApiRequest } from '@/api/api.interface';
import { type IDialog } from '@/context/dialog/dialog.interface';
import CardPage from '@/core2/card/page';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';

import IndexGroup from './group';
import ViewInviteStaff from './invite';
import { ViewListStaff } from './list';
import { type IFormInviteStaff } from './types';

interface IViewGroup {
  apiListStaff: IApiRequest;
  payload: object;
  handleSubmitInviteStaff: (values: Record<string, IFormInviteStaff>) => void;
  isLoading: boolean;
  keyView: string;
  onRequestSuccessListGroup?: (data: any) => void;
  listGroup: IItemDataDropDown[];
  onChangeSelectGroup: (event: DropDownListChangeEvent) => void;
  selectGroup: IItemDataDropDown;
  onSetView: (parameter: IDialog) => void;
  setKey: any;
}

const ViewStaff = (props: IViewGroup) => {
  const {
    onChangeSelectGroup,
    listGroup,
    apiListStaff,
    payload,
    handleSubmitInviteStaff,
    isLoading,
    keyView,
    onRequestSuccessListGroup,
    selectGroup,
    onSetView,
    setKey,
  } = props;

  return (
    <div className='flex flex-column'>
      <CardPage title='groupStaff.title'>
        <div className='px-10'>
          <IndexGroup onRequestSuccessListGroup={onRequestSuccessListGroup} />
        </div>
      </CardPage>
      <CardPage title='groupStaff.staffByID.detailTitle'>
        <div className='px-10 flex flex-column gap-3'>
          <div className='w-60'>
            <DropDownRoot
              onChange={onChangeSelectGroup}
              defaultValue={listGroup[0]}
              label='staff.selectGroup'
              name={'group'}
              data={listGroup}
            />
          </div>
          <div className='flex gap-3 w-full xl:flex-column xl:gap-5 pb-10'>
            <ViewInviteStaff
              handleSubmitInviteStaff={handleSubmitInviteStaff}
              isLoading={isLoading}
            />
            <ViewListStaff
              setKey={setKey}
              onSetView={onSetView}
              keyView={keyView}
              selectGroup={selectGroup}
              apiList={apiListStaff}
              payload={payload}
            />
          </div>
        </div>
      </CardPage>
    </div>
  );
};

export { ViewStaff };
