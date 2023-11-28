import { type FunctionComponent } from 'react';

import { type IDialog, TYPE_DIALOG, TYPE_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardForm, CardPage } from '@/core2/card';
import { ItemRoot } from '@/core2/item';
import { LoaderRoot } from '@/core2/loader';
import { DEVICE_TYPE_PARSE, EnumPath, PARSE_STATUS_DEVICE } from '@/utils/Enums';

import ChipStatusDevice from '../components/chipStatus';
import { type IResponseDetail } from './component';
interface IViewDetailDevice {
  detail: IResponseDetail | null;
  loading: boolean;
  handleUpdate: (parameter: IDialog) => void;
  handleUpdateSuccess: () => void;
}

const ViewDetailDevice: FunctionComponent<IViewDetailDevice> = ({
  detail,
  loading,
  handleUpdate,
  handleUpdateSuccess,
}) => {
  return loading ? (
    <LoaderRoot />
  ) : (
    detail && (
      <CardPage
        title='device.detailTitle'
        className='px-10'
        backPath={EnumPath.DEVICE}>
        <CardForm className='grid grid-cols-2 gap-3 relative'>
          <div className='absolute right-4 top-4'>
            <ButtonRoot
              icon='edit'
              themeColor='warning'
              onClick={() => {
                handleUpdate({
                  titleDialog: <Localize tid='device.updateStatusTitle' />,
                  typeDialog: TYPE_DIALOG.UPDATE_STATUS_DEVICE,
                  typeModel: TYPE_MODAL.CUSTOM,
                  data: { detail },
                  onSubmit: () => {
                    handleUpdateSuccess();
                  },
                });
              }}>
              <span className='ls-p_medium'>
                <Localize tid='update' />
              </span>
            </ButtonRoot>
          </div>
          <section className='ls-px_larger'>
            <article className='ls-py_larger ls-flex ls-flex-col ls-gap_2'>
              <ItemRoot
                label={'device.status'}
                content={
                  <ChipStatusDevice status={detail.status}>
                    <Localize tid={`device.${PARSE_STATUS_DEVICE[detail.status]}`} />
                  </ChipStatusDevice>
                }
              />
              <ItemRoot
                label={'device.deviceId'}
                content={detail.deviceId}
              />
              <ItemRoot
                label={'device.deviceName'}
                content={detail.deviceName}
              />
              <ItemRoot
                label={'device.deviceType'}
                content={<Localize tid={`device.type.${DEVICE_TYPE_PARSE[detail.deviceType]}`} />}
              />
              <ItemRoot
                label={'device.deviceProducer'}
                content={detail.deviceProducer}
              />
              <ItemRoot
                label={'device.deviceModel'}
                content={detail.deviceModel}
              />
              <ItemRoot
                label={'device.versionOS'}
                content={detail.versionOS}
              />
              <ItemRoot
                label={'device.platformOS'}
                content={detail.platformOS}
              />
              <ItemRoot
                label={'device.deviceIPAddress'}
                content={detail.deviceIPAddress}
              />
            </article>
          </section>
        </CardForm>
      </CardPage>
    )
  );
};

export { ViewDetailDevice };
