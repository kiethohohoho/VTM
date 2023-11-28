import { useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useGet, useRequest } from '@/api/api.middleware';
import Config from '@/Config';
import { ContextModal } from '@/context/dialog';
import { Localize } from '@/context/languages';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { type IWarehouse } from '@/layouts/dialog/importGoodsBarCode/types';
import AuthService from '@/utils/Auth';
import { EnumPath, Order, OrderBy } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { type IImage, type IPayloadCreateProduct, type IPayloadImportGoods, type IProductSku } from '../types';
import { ViewCreateProduct } from './view';

interface IComponentCreateProduct {
  apiUploadProduct: IApiRequest;
  apiUploadImage: IApiRequest;
  apiImportGood: IApiRequest;
  apiListWarehouse: IApiRequest;
}
const config = new Config().getState();

const ComponentCreateProduct = (props: IComponentCreateProduct) => {
  const { apiUploadImage, apiUploadProduct, apiImportGood, apiListWarehouse } = props;
  const { status } = useContext(ContextModal);
  const [images, setImages] = useState<IImage[]>([]);
  const [dataProduct, setDataProduct] = useState<IPayloadCreateProduct>();
  const [warehouses, setWareHouses] = useState<IItemDataDropDown[]>([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleUploadImage = (images: File[]) => {
    try {
      const promiseUrl = Array.from(images).map(async image => {
        return await new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({ file: image, src: reader.result, id: Helper.randomKey() });
          };
          reader.readAsDataURL(image);
        });
      });
      Promise.all(promiseUrl).then(data => {
        setImages(prev => [...prev, ...(data as IImage[])]);
      });
    } catch (error: any) {
      LoggerService.error(`ComponentCreateProduct execute handleUploadImage receive error:`, error.toString());
    }
  };

  const handleRemoveImage = (id: string) => {
    try {
      const newImageList = images.filter(image => image.id !== id);
      setImages(newImageList);
    } catch (error: any) {
      LoggerService.error(`ComponentCreateProduct execute handleRemoveImage receive error:`, error.toString());
    }
  };

  const callbackFuncProductUploadImage = {
    handleRequestSuccess: (data: any) => {
      try {
        LoggerService.debug('ComponentCreateProduct execute handleRequestSuccess receive data', typeof data);
        const url = data.files.map((file: any) => file.link);
        mutateUploadGood({ list: [{ ...dataProduct, images: JSON.stringify(url) }] });
      } catch (error: any) {
        LoggerService.error('ComponentCreateProduct execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ComponentCreateProduct execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('ComponentCreateProduct execute handleRequestError receive error', error);
      }
    },
  };
  const { storeId } = AuthService.getPackageProfile();

  const callbackFuncListWareHouse = {
    handleRequestSuccess: (data: IWarehouse[]) => {
      try {
        LoggerService.debug(
          'ComponentDialogImportGoods execute callbackFuncListWareHouse.handleRequestSuccess receive response',
          data,
        );
        if (!Helper.isEmpty(data)) {
          const list: IItemDataDropDown[] = data.map((item: IWarehouse) => ({
            id: item.warehouseId,
            text: item.name,
          }));
          setWareHouses(list);
        } else {
          setWareHouses([]);
        }
      } catch (error: any) {
        LoggerService.error(
          'ComponentDialogImportGoods execute callbackFuncListWareHouse.handleRequestSuccess receive error',
          error,
        );
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ComponentDialogImportGoods execute callbackFuncListWareHouse.handleRequestError');
      } catch (error: any) {
        LoggerService.error(
          'ComponentDialogImportGoods execute callbackFuncListWareHouse.handleRequestError receive error',
          error,
        );
      }
    },
  };

  const { isLoading: isLoadingGetListWareHouse } = useGet(
    {
      ...apiListWarehouse,
      payload: {
        order: Order.CREATED_AT,
        by: OrderBy.DESC,
      },
      params: {
        storeId,
      },
    },
    callbackFuncListWareHouse,
  );
  const callbackFuncUploadProduct = {
    handleRequestSuccess: (data: any) => {
      try {
        LoggerService.debug('ComponentCreateProduct execute callbackFuncUploadProduct receive data', typeof data);
        const importGoodsList: IPayloadImportGoods[] = [];
        if (dataProduct && dataProduct.productSkus.length > 0) {
          for (let i = 0; i < dataProduct?.productSkus.length; i++) {
            const sku = dataProduct.productSkus[i];
            importGoodsList.push({
              sku: sku.skuVariationIncluded,
              retailerProductId: data.list[0].productId,
              quantity: Number(sku.quantity),
              sellingPrice: sku?.sellingPrice,
              importPrice: sku.importPrice,
              wareHouseId: warehouses[0].id,
              storeId,
            });
          }
          mutateImportGoods({ importGoodsList });
        }
      } catch (error: any) {
        LoggerService.error('ComponentCreateProduct execute callbackFuncUploadProduct receive error', error.toString());
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ComponentCreateProduct execute callbackFuncUploadProduct');
      } catch (error: any) {
        LoggerService.error('ComponentCreateProduct execute callbackFuncUploadProduct receive error', error);
      }
    },
  };

  const callbackFuncImportGoods = {
    handleRequestSuccess: (response: object) => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='product.importSuccess' />);
        queryClient.invalidateQueries(['delete', config.api.lsProduct.retailerProduct]);
        navigate(EnumPath.PRODUCT);
        LoggerService.debug(
          'DialogImportProductComponent execute callbackFunc handleRequestSuccess receive response',
          response,
        );
      } catch (error: any) {
        LoggerService.error(
          'DialogImportProductComponent execute callbackFunc handleRequestSuccess receive error',
          error,
        );
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('DialogImportProductComponent execute handleRequestError');
      } catch (error: any) {
        LoggerService.error('DialogImportProductComponent execute handleRequestError receive error', error.toString());
      }
    },
  };

  const { isLoading: isLoadingUploadImages, mutate: mutateUploadImages } = useRequest(
    apiUploadImage,
    callbackFuncProductUploadImage,
  );
  const { isLoading: isLoadingUploadGoods, mutate: mutateUploadGood } = useRequest(
    apiUploadProduct,
    callbackFuncUploadProduct,
  );

  const { isLoading: isLoadingImportGoods, mutate: mutateImportGoods } = useRequest(
    apiImportGood,
    callbackFuncImportGoods,
  );

  const handleUploadProduct = (dataItem: Record<string, any>) => {
    const newListSku: IProductSku[] = [];
    for (const property in dataItem.productSkus) {
      newListSku.push(dataItem.productSkus[property]);
    }
    const formDataImages = new FormData();
    images.map(image => {
      formDataImages.append('file', image.file);
      return null;
    });
    formDataImages.append('type', '5');
    const createProductPayload: IPayloadCreateProduct = {
      name: dataItem.name,
      description: dataItem.description,
      category: dataItem.category,
      images: '',
      productSkus: newListSku,
    };
    setDataProduct(createProductPayload);
    mutateUploadImages(formDataImages);
  };
  return (
    <ViewCreateProduct
      key={status}
      images={images}
      isLoading={isLoadingImportGoods || isLoadingUploadGoods || isLoadingUploadImages || isLoadingGetListWareHouse}
      handleUploadImage={handleUploadImage}
      handleRemoveImage={handleRemoveImage}
      handleUploadProduct={handleUploadProduct}
    />
  );
};

export { ComponentCreateProduct };
