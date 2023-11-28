import { type FunctionComponent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useGet, useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { EnumPath, type STATUS_YES_NO } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import { type IResponseDetail } from '../detail/component';
import View from './view';

interface UpdateStoreComponentProps {
  apiDetail: IApiRequest;
  apiUpdate: IApiRequest;
}
export interface IPayload {
  storeId: string;
  address: string;
  countryCode: string;
  districtCode: string;
  isOnline: STATUS_YES_NO;
  license: string;
  name: string;
  // nameOwner: string;
  // residence: string;
  // status: STATUS_STORE;
  // taxNumber: string;
  shopName: string;
}

const UpdateStoreComponent: FunctionComponent<UpdateStoreComponentProps> = props => {
  const { apiDetail, apiUpdate } = props;
  const [detail, setDetail] = useState<IResponseDetail | null>(null);

  const params = useParams();
  const navigate = useNavigate();

  const callbackFuncDetailInUpdateStore = {
    handleRequestSuccess: (data: IResponseDetail) => {
      try {
        LoggerService.debug('ListComponent execute handleRequestSuccess receive list', data);
        setDetail(data);
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ListComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestError receive error', error);
      }
    },
  };
  const callbackFuncUpdateStore = {
    handleRequestSuccess: (data: IResponseDetail) => {
      try {
        LoggerService.debug('ListComponent execute handleRequestSuccess receive list', data);
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='store.updateSuccess' />);
        navigate(`${EnumPath.STORE_DETAIL}/${detail && detail.storeId}`);
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ListComponent execute handleRequestSuccess receive list');
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestError receive error', error);
      }
    },
  };
  const handleSubmitUpdate = (dataItem: Record<string, any>) => {
    const payload: IPayload = {
      storeId: detail?.storeId as string,
      name: dataItem.name,
      // taxNumber: dataItem.taxNumber,
      // classification: dataItem.classification,
      license: dataItem.license,
      address: dataItem.address,
      // cover: dataItem.cover,
      // photo: dataItem.photo,
      isOnline: Number(dataItem.isOnline),
      shopName: dataItem.shopName,
      // description: dataItem.description,
      // businessName: dataItem.businessName,
      // issueDate: Helper.dateTimeToMilliseconds(dataItem.issueDate),
      // establishment: Helper.dateTimeToMilliseconds(dataItem.establishment),
      // residence: dataItem.residence,
      // nameOwner: dataItem.nameOwner,
      // phone: dataItem.phone,
      countryCode: dataItem.country?.id,
      // cityCode: dataItem.cityCode,
      districtCode: dataItem.districtCode,
      // wardCode: dataItem.wardCode,
      // warehouse: {
      //   name: dataItem.wareHouseName,
      //   address: dataItem.wareHouseAddress,
      // },
      // companyName: dataItem.companyName,
      // registeredAt: dataItem.registeredAt,
      // under: dataItem.under,
      // formOfEnterprise: dataItem.formOfEnterprise,
      // mainBusiness: dataItem.mainBusiness,
      // nationalityLicense: dataItem.nationalityLicense,
    };
    mutate(payload);
  };
  const { isLoading: loadingUpdate, mutate } = useRequest(apiUpdate, callbackFuncUpdateStore);
  const { isLoading } = useGet({ ...apiDetail, params: { storeId: params?.storeId } }, callbackFuncDetailInUpdateStore);
  return (
    <View
      handleSubmitUpdate={handleSubmitUpdate}
      detail={detail}
      loading={isLoading}
      loadingUpdate={loadingUpdate}
    />
  );
};

export default UpdateStoreComponent;
