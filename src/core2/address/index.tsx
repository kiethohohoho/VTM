/* eslint-disable no-case-declarations */
import { type DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { type FormRenderProps } from '@progress/kendo-react-form';
import React, { useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
// import Config from '@/Config';
import { ENUM_COUNTRY } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import { DropDownRoot } from '../dropdown';
import { type IItemDataDropDown } from '../dropdown/type';

// const config = new Config().getState();
const apiListCity: IApiRequest = {
  method: 'get',
  //   url: config.api.userPortal.other.provinces.city,
  url: 'portalUser/provinces/city',
  host: 'https://api.dev.locstoc.com',
};
const apiListDistrict: IApiRequest = {
  method: 'get',
  //   url: config.api.userPortal.other.provinces.districts,
  url: 'portalUser/provinces/districts',
  host: 'https://api.dev.locstoc.com',
};
const apiListWard: IApiRequest = {
  method: 'get',
  //   url: config.api.userPortal.other.provinces.wards,
  url: 'portalUser/provinces/wards',
  host: 'https://api.dev.locstoc.com',
};
enum ACTION_API_PROVINCES {
  CITY,
  DISTRICT,
  WARD,
}
const listCountry: IItemDataDropDown[] = [
  {
    id: ENUM_COUNTRY.VN,
    text: 'vietnam',
  },
  {
    id: ENUM_COUNTRY.CAM,
    text: 'cambodia',
  },
  {
    id: ENUM_COUNTRY.THAI,
    text: 'thailand',
  },
  {
    id: ENUM_COUNTRY.SIN,
    text: 'singapore',
  },
];
interface IFormAddressState {
  country: {
    currentValue: IItemDataDropDown;
    list: IItemDataDropDown[];
  };
  city: {
    currentValue: IItemDataDropDown;
    list: IItemDataDropDown[];
  };
  district: {
    currentValue: IItemDataDropDown;
    list: IItemDataDropDown[];
  };
  ward: {
    currentValue: IItemDataDropDown;
    list: IItemDataDropDown[];
  };
  action: ACTION_API_PROVINCES;
}
const initState: IFormAddressState = {
  country: {
    currentValue: {
      id: '',
      text: '',
    },
    list: listCountry,
  },
  city: {
    currentValue: {
      id: '',
      text: '',
    },
    list: [],
  },
  district: {
    currentValue: {
      id: '',
      text: '',
    },
    list: [],
  },
  ward: {
    currentValue: {
      id: '',
      text: '',
    },
    list: [],
  },
  action: ACTION_API_PROVINCES.CITY,
};
export interface IGetValueAddress {
  countryCode: ENUM_COUNTRY | string | number;
  cityCode: string | number;
  districtCode: string | number;
  wardCode: string | number;
}
interface IFormAddress {
  onChangeAddress: (address: IGetValueAddress) => void;
  formRenderProps: FormRenderProps;
}
export default function FormAddress({ onChangeAddress, formRenderProps }: IFormAddress) {
  const [state, setState] = useState<IFormAddressState>(initState);

  const funcRequest = {
    handleRequestSuccess: (data: any) => {
      try {
        LoggerService.debug('ProvincesTable execute handleRequestSuccess', data);
        switch (state.action) {
          case ACTION_API_PROVINCES.CITY:
            const dataCity: IItemDataDropDown[] = data.map((item: any) => ({
              id: item.cityCode,
              text: item.cityName,
            }));
            setState({
              ...state,
              city: {
                ...state.city,
                list: dataCity,
              },
              action: ACTION_API_PROVINCES.DISTRICT,
            });
            break;
          case ACTION_API_PROVINCES.DISTRICT:
            const dataDistrict: IItemDataDropDown[] = data.map((item: any) => ({
              id: item.districtsCode,
              text: item.districtsName,
            }));
            setState({
              ...state,
              district: {
                ...state.district,
                list: dataDistrict,
              },
              action: ACTION_API_PROVINCES.WARD,
            });
            break;
          default:
            const dataWard: IItemDataDropDown[] = data.map((item: any) => ({
              id: item.wardsCode,
              text: item.wardsName,
            }));
            setState({
              ...state,
              ward: {
                ...state.ward,
                list: dataWard,
              },
            });
            break;
        }
      } catch (error: any) {
        LoggerService.error('ProvincesTable execute error handleRequestSuccess', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ProvincesTable execute handleRequestError');
      } catch (error: any) {}
    },
  };
  const { mutate: mutateCity } = useRequest(apiListCity, funcRequest);
  const { mutate: mutateDistrict } = useRequest(apiListDistrict, funcRequest);
  const { mutate: mutateWard } = useRequest(apiListWard, funcRequest);

  const handleOnchangeCountry = (event: DropDownListChangeEvent) => {
    if (state.country.currentValue !== event.value) {
      setState({
        ...initState,
        country: {
          ...state.country,
          currentValue: event.value,
        },
      });
      onChangeAddress({
        countryCode: event.value.id,
        cityCode: '',
        districtCode: '',
        wardCode: '',
      });
      mutateCity({ countryCode: event.value.id });
      formRenderProps.onChange('city', { value: undefined });
      formRenderProps.onChange('district', { value: undefined });
      formRenderProps.onChange('ward', { value: undefined });
    }
  };
  const handleOnchangeCity = (event: DropDownListChangeEvent) => {
    setState({
      ...state,
      district: initState.district,
      ward: initState.ward,
      action: ACTION_API_PROVINCES.DISTRICT,
      city: {
        ...state.city,
        currentValue: event.value,
      },
    });
    onChangeAddress({
      countryCode: state.country.currentValue.id,
      cityCode: event.value.id,
      districtCode: '',
      wardCode: '',
    });
    formRenderProps.onChange('district', { value: undefined });
    formRenderProps.onChange('ward', { value: undefined });

    mutateDistrict({ cityCode: event.value.id });
  };
  const handleOnchangeDistrict = (event: DropDownListChangeEvent) => {
    setState({
      ...state,
      ward: initState.ward,
      action: ACTION_API_PROVINCES.WARD,
      district: {
        ...state.district,
        currentValue: event.value,
      },
    });
    onChangeAddress({
      countryCode: state.country.currentValue.id,
      cityCode: state.city.currentValue.id,
      districtCode: event.value.id,
      wardCode: '',
    });
    formRenderProps.onChange('ward', { value: undefined });
    mutateWard({ districtsCode: event.value.id });
  };
  const handleOnchangeWard = (event: DropDownListChangeEvent) => {
    setState({
      ...state,
      ward: {
        ...state.ward,
        currentValue: event.value,
      },
    });
    onChangeAddress({
      countryCode: state.country.currentValue.id,
      cityCode: state.city.currentValue.id,
      districtCode: state.district.currentValue.id,
      wardCode: event.value.id,
    });
  };

  return (
    <React.Fragment>
      <DropDownRoot
        isForm
        label='provinces.country'
        data={state.country.list}
        id={'country'}
        name={'country'}
        onChange={handleOnchangeCountry}
        value={state.country.currentValue}
      />
      <DropDownRoot
        isForm
        data={state.city.list}
        id={'city'}
        name={'city'}
        label='provinces.city'
        onChange={handleOnchangeCity}
        value={state.city.currentValue}
      />
      <DropDownRoot
        isForm
        label='provinces.district'
        id={'district'}
        name={'district'}
        data={state.district.list}
        value={state.district.currentValue}
        onChange={handleOnchangeDistrict}
      />
      <DropDownRoot
        isForm
        label='provinces.ward'
        id={'ward'}
        name={'ward'}
        data={state.ward.list}
        value={state.ward.currentValue}
        onChange={handleOnchangeWard}
      />
    </React.Fragment>
  );
}
