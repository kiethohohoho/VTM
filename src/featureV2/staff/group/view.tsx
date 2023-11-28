import { type IApiRequest } from '@/api/api.interface';
import { type IDialog } from '@/context/dialog/dialog.interface';

import ViewCreateGroup from './add';
import { ViewListGroup } from './list';
interface IViewGroup {
  apiListGroup: IApiRequest;
  payload: object;
  handleSubmitCreateGroup: (data: any) => void;
  isLoading: boolean;
  key: string;
  onRequestSuccessListGroup?: (data: any) => void;
  onSetView: (parameter: IDialog) => void;
  setKey: any;
}

const ViewGroup = (props: IViewGroup) => {
  const {
    setKey,
    onSetView,
    apiListGroup,
    payload,
    handleSubmitCreateGroup,
    isLoading,
    key,
    onRequestSuccessListGroup,
  } = props;

  return (
    <div className='flex gap-3 w-full xl:flex-column xl:gap-5'>
      <ViewCreateGroup
        handleSubmitCreateGroup={handleSubmitCreateGroup}
        isLoading={isLoading}
      />
      <ViewListGroup
        setKey={setKey}
        onSetView={onSetView}
        onRequestSuccessListGroup={onRequestSuccessListGroup}
        key={key}
        apiList={apiListGroup}
        payload={payload}
      />
    </div>
  );
};

export { ViewGroup };
