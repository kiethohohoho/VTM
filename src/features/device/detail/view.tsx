import { type FunctionComponent } from 'react';

import { type IDialog } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { CardPage } from '@/core2/card';
import { ItemRoot } from '@/core2/item';
import { LoaderRoot } from '@/core2/loader';
import { DEVICE_TYPE_PARSE, PARSE_STATUS_DEVICE } from '@/utils/Enums';

import ChipStatusDevice from '../components/chipStatus';
import { type IResponseDetail } from './component';
interface ViewProps {
  detail: IResponseDetail | null;
  loading: boolean;
  handleUpdate: (parameter: IDialog) => void;
  handleUpdateSuccess: () => void;
}

const View: FunctionComponent<ViewProps> = ({ detail, loading, handleUpdate, handleUpdateSuccess }) => {
  return loading ? (
    <LoaderRoot />
  ) : (
    detail && (
      <CardPage
      // title={<Localize tid='device.detailTitle' />}
      // actionHeader={
      //   <ButtonRoot
      //     icon='edit'
      //     size='sm'
      //     bgColor='warning'
      //     fontColor='dark'
      //     onClick={() => {
      //       handleUpdate({
      //         titleDialog: <Localize tid='device.updateStatusTitle' />,
      //         typeDialog: TYPE_DIALOG.UPDATE_STATUS_DEVICE,
      //         typeModel: TYPE_MODAL.CUSTOM,
      //         data: { detail },
      //         onSubmit: () => {
      //           handleUpdateSuccess();
      //         },
      //       });
      //     }}
      //     rounded='md'>
      //     <span className='ls-p_medium'>
      //       <Localize tid='update' />
      //     </span>
      //   </ButtonRoot>
      // }
      >
        <section className='ls-flex ls-flex-col ls-gap_3'>
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
        </section>
      </CardPage>
    )
  );
};

export default View;
