import { type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { EnumPath, type STATUS_YES_NO } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import View from './view';

interface StoreComponentProps {
  api: IApiRequest;
}
export interface IPayload {
  name: string;
  companyName: string;
  registeredAt: string;
  under: string;
  formOfEnterprise: string;
  mainBusiness: string;
  nationalityLicense: string;
  taxNumber: string;
  classification: string;
  license: string;
  address: string;
  cover: string;
  photo: string;
  isOnline: STATUS_YES_NO;
  shopName: string;
  description: string;
  // businessName: string;
  // issueDate: number;
  // establishment: number;
  residence: number;
  nameOwner: string;
  phone: string;
  countryCode: string;
  cityCode: string;
  districtCode: string;
  wardCode: string;
  warehouse: {
    name: string;
    address: string;
  };
}

const StoreComponent: FunctionComponent<StoreComponentProps> = props => {
  const navigate = useNavigate();
  const { api } = props;
  const callbackFunc = {
    handleRequestSuccess: (data: object) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='store.createSuccess' />);
        navigate(EnumPath.STORE);
        LoggerService.debug('ListComponent execute handleRequestSuccess receive list', data);
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

  const handleSubmitCreate = (dataItem: Record<string, any>) => {
    const payload: IPayload = {
      name: dataItem.name,
      taxNumber: dataItem.taxNumber,
      classification: dataItem.classification,
      license: dataItem.license,
      address: dataItem.address,
      cover: dataItem.cover,
      photo: dataItem.photo,
      isOnline: Number(dataItem.isOnline),
      shopName: dataItem.shopName,
      description: dataItem.description,
      // businessName: dataItem.businessName,
      // issueDate: Helper.dateTimeToMilliseconds(dataItem.issueDate),
      // establishment: Helper.dateTimeToMilliseconds(dataItem.establishment),
      residence: dataItem.residence,
      nameOwner: dataItem.nameOwner,
      phone: dataItem.phone,
      countryCode: dataItem.country.id,
      cityCode: dataItem.cityCode,
      districtCode: dataItem.districtCode,
      wardCode: dataItem.wardCode,
      warehouse: {
        name: dataItem.wareHouseName,
        address: dataItem.wareHouseAddress,
      },
      companyName: dataItem.companyName,
      registeredAt: dataItem.registeredAt,
      under: dataItem.under,
      formOfEnterprise: dataItem.formOfEnterprise,
      mainBusiness: dataItem.mainBusiness,
      nationalityLicense: dataItem.nationalityLicense,
    };
    mutate(payload);
  };
  const { isLoading, mutate } = useRequest(api, callbackFunc);

  return (
    <View
      handleSubmitCreate={handleSubmitCreate}
      loading={isLoading}
    />
  );
};

export default StoreComponent;
