import Config from '@/Config';
import { ButtonRoot } from '@/core2/button';
import LayoutAuthTitle from '@/layouts/auth2/components/title';
import { type STATUS_STORE } from '@/utils/Enums';

import { VIEW_LOGIN } from '../login.interface';

const config = new Config().getState();

export interface IStore {
  storeId: string;
  name: string;
  status: number;
  address: string;
  cover: string;
  photo: string;
  [property: string]: any;
}
interface ISelectStoreView {
  loading: boolean;
  listStore: IStore[];
  handleSelectStore: (storeId: string, storeStatus: STATUS_STORE) => void;
  handleChangeView: (step: VIEW_LOGIN) => void;
}

const SelectStoreView = (props: ISelectStoreView) => {
  const { listStore, handleSelectStore, handleChangeView } = props;
  return (
    <div className='flex flex-column h-full items-center px-4'>
      <div className='text-center pt-8'>
        <LayoutAuthTitle title='selectStore' />
      </div>
      <div
        className='h-80 pb-28'
        style={{ overflowY: 'auto', width: 500 }}>
        <div className={`w-full grid grid-cols-${listStore?.length} gap-2`}>
          {listStore?.map(store => {
            return (
              <div
                key={store.storeId}
                className='h-max border border-solid border-primary-border rounded-2xl flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-primary-border'
                onClick={() => {
                  handleSelectStore(store.storeId, store.status);
                }}>
                <div className='w-16 h-16'>
                  <img
                    src={`${config.api.static.host}${store.photo}`}
                    alt={store.name}
                    className='w-full h-full'
                  />
                </div>
                <div className='flex flex-column justify-start h-full gap-4'>
                  <span className='font-medium text-xl truncate w-52'>{store.name}</span>
                  <span className='font-normal text-xs'>{store.address}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          width: 500,
        }}
        className='w-full flex justify-end'>
        <ButtonRoot
          fillMode={'flat'}
          icon='arrow-chevron-left'
          onClick={() => {
            handleChangeView(VIEW_LOGIN.SELECT_ROLE);
          }}
          text='account.forgotBackButton'
        />
      </div>
    </div>
  );
};
export { SelectStoreView };
