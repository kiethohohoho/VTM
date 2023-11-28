import { type IDialog } from '@/context/dialog/dialog.interface';
import CardPage from '@/core2/card/page';
import { ScreenLoader } from '@/core2/loader';
import { EnumPath } from '@/utils/Enums';

import AddressConsumer from './components/address';
import InformationConsumer from './components/information';
import OtherCustomer from './components/other';
import { type IResponseDetail } from './types';
interface IViewDetailConsumer {
  detail: IResponseDetail | null;
  loading: boolean;
  handleUpdate: (parameter: IDialog) => void;
  handleUpdateSuccess: () => void;
}

const ViewDetailConsumer: React.FC<IViewDetailConsumer> = ({ detail, loading, handleUpdate, handleUpdateSuccess }) => {
  return loading ? (
    <ScreenLoader />
  ) : (
    detail && (
      <CardPage
        backPath={EnumPath.CONSUMER}
        className='px-10 flex gap-5 xl:flex-column'
        title='consumer.detail'>
        <div
          style={{
            minWidth: 455,
          }}
          className='flex flex-column gap-5 w-fit'>
          <InformationConsumer {...detail} />
          <AddressConsumer {...detail} />
        </div>
        <OtherCustomer {...detail} />
      </CardPage>
    )
  );
};

export { ViewDetailConsumer };
