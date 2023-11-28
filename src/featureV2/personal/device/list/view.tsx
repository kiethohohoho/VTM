import { type GridColumnProps } from '@progress/kendo-react-grid';
import { type FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { Localize } from '@/context/languages';
import { CardPage } from '@/core2/card';
import { TableRequest } from '@/core2/table';
import { CellRoot } from '@/core2/table/components/cell';
import { DEVICE_TYPE_PARSE, EnumPath, PARSE_STATUS_DEVICE } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

import ChipStatusDevice from '../components/chipStatus';
import { FormToolbarListDevice } from './components/formToolbar';

interface IViewListDevice {
  apiList: IApiRequest;
  payload: object;
}

const gridColumnsFC = (): GridColumnProps[] => {
  return [
    {
      field: '#',
      width: '50',
      cell: ({ dataIndex }) => <CellRoot>{dataIndex + 1}</CellRoot>,
    },
    {
      field: 'deviceId',
      title: 'device.deviceId',
      width: 300,
      cell: ({ dataItem }) => {
        return (
          <CellRoot>
            <Link
              style={{ color: 'blue' }}
              to={`${EnumPath.DEVICE}/${dataItem.deviceId}`}>
              <ins style={{ textDecoration: 'none' }}>{dataItem.deviceId}</ins>
            </Link>
          </CellRoot>
        );
      },
    },
    {
      field: 'deviceName',
      filter: 'text',
      title: 'device.deviceDisplayName',
    },
    {
      field: 'deviceType',
      filter: 'text',
      title: 'device.deviceType',
      cell: ({ dataItem }) => {
        return (
          <CellRoot>
            <Localize tid={`device.type.${DEVICE_TYPE_PARSE[dataItem.deviceType]}`} />
          </CellRoot>
        );
      },
    },
    {
      field: 'deviceIPAddress',
      filter: 'text',
      title: 'device.deviceIPAddress',
    },
    {
      field: 'status',
      title: 'device.status',
      cell: ({ dataItem }) => {
        return (
          <CellRoot>
            <div style={{ display: 'flex' }}>
              <div style={{ alignItems: 'flex-start' }}>
                <ChipStatusDevice status={dataItem.status}>
                  <Localize tid={`device.${PARSE_STATUS_DEVICE[dataItem.status]}`} />
                </ChipStatusDevice>
              </div>
            </div>
          </CellRoot>
        );
      },
    },
    {
      field: 'createdAt',
      title: 'createdAt',
      cell: ({ dataItem }) => <CellRoot>{Helper.formatDateFull(dataItem?.createdAt)}</CellRoot>,
    },
  ];
};

const ViewListDevice: FunctionComponent<IViewListDevice> = props => {
  const { apiList, payload } = props;
  const gridColumns: GridColumnProps[] = gridColumnsFC();
  return (
    <CardPage title='device.title'>
      <TableRequest
        toolbar={({ dataState, onDataStateChange }) => (
          <FormToolbarListDevice
            dataState={dataState}
            onDataStateChange={onDataStateChange}
          />
        )}
        sortable
        payload={payload}
        apiList={apiList}
        gridColumns={gridColumns}
      />
    </CardPage>
  );
};

export { ViewListDevice };
