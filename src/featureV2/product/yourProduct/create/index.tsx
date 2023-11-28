import React from 'react';

import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import { ComponentCreateProduct } from './component';

const config = new Config().getState();

const IndexCreateYourProduct = () => {
  const auth = AuthService.getPackageAuth();
  const apiUploadProduct: IApiRequest = {
    method: 'post',
    url: config.api.lsProduct.retailerProduct,
    headers: {
      token: auth?.token,
    },
  };
  const apiUploadImage: IApiRequest = {
    method: 'post',
    url: config.api.lsProduct.retailerUpload,
    headers: {
      token: auth?.token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const apiImportGood: IApiRequest = {
    method: 'put',
    url: config.api.lsProduct.goods,
    headers: {
      token: auth?.token,
    },
  };
  const apiListWarehouse: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.warehouse._,
    headers: {
      token: auth?.token,
    },
  };
  return (
    <ComponentCreateProduct
      apiImportGood={apiImportGood}
      apiUploadProduct={apiUploadProduct}
      apiUploadImage={apiUploadImage}
      apiListWarehouse={apiListWarehouse}
    />
  );
};

export default IndexCreateYourProduct;
