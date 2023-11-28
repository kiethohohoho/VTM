import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import Config from '@/Config';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
import { type IState, type IToolBarProps } from '@/core2/table/request';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { getListStore } from '@/features/common/getListStore';
import AuthService from '@/utils/Auth';
import { From, Limit, Order, OrderBy, STATUS_PUBLISH_O2O } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { ENUM_STATE_UPDATE_O2O } from '../component';

interface IParametersHandleSubmit {
  search: IItemDataDropDown;
  searchValue: string;
  isO2O: IItemDataDropDown;
  store: IItemDataDropDown;
}
interface IFormToolbarListGoodO2O {
  storeId: string | number;
  listGoodsUpdateStateO2O?: string[];
  handleChangeMode: (mode: number) => void;
  handleResetListGoodsUpdateO2O: () => void;
}
const config = new Config().getState();
const auth = AuthService.getPackageAuth();

const apiUpdateToO2O: IApiRequest = {
  method: 'delete',
  url: config.api.lsProduct.goods,
  headers: {
    token: auth?.token,
  },
};
function FormToolbarListGoodO2O({
  dataState,
  onDataStateChange,
  listGoodsUpdateStateO2O = [],
  handleChangeMode,
  handleResetListGoodsUpdateO2O,
}: IToolBarProps & IFormToolbarListGoodO2O) {
  /* variable */
  const itemsDropdownO2OStatus: IItemDataDropDown[] = [
    {
      id: STATUS_PUBLISH_O2O.ALL,
      text: 'productInventory.stateO2OAll',
    },
    {
      id: STATUS_PUBLISH_O2O.ISO2O,
      text: 'productInventory.stateO2OAllYes',
    },
    {
      id: STATUS_PUBLISH_O2O.LOCAL,
      text: 'productInventory.stateO2OAllNo',
    },
  ];

  /* variable */
  const itemsDropdownGoodPublishO2O: IItemDataDropDown[] = [
    {
      id: 'goods.goodsId',
      text: 'goods.id',
    },
    {
      id: 'productDictionary.name',
      text: 'goods.name',
    },

    {
      id: 'goods.sku',
      text: 'sku',
    },
    {
      id: 'productDictionary.barcode',
      text: 'barcode',
    },
  ];

  const [formKey, setFormKey] = useState(1);
  const { listStore } = getListStore();

  /* handle */
  const handleSubmitFormPublishO2O = ({ search, searchValue, isO2O, store }: IParametersHandleSubmit) => {
    const newDataState: IState & Record<string, any> = {
      skip: From.DEFAULT,
      take: Limit.DEFAULT,
      order: Order.CREATED_AT,
      by: OrderBy.DESC,
      search: search?.id as string,
      searchValue,
      storeId: store?.id || listStore[0]?.id,
    };
    if (Number(isO2O.id) !== STATUS_PUBLISH_O2O.ALL) {
      newDataState.filter1 = 'goods.isO2O';
      newDataState.filterValue1 = isO2O.id;
      handleChangeMode(ENUM_STATE_UPDATE_O2O.UPDATE_O2O);
    } else {
      handleChangeMode(ENUM_STATE_UPDATE_O2O.NORMAL);
    }
    handleResetListGoodsUpdateO2O();
    onDataStateChange(Helper.removeObjectEmpty(newDataState));
  };
  const handleResetO2OList = () => {
    const resetDataState: IState & Record<string, any> = {
      order: Order.CREATED_AT,
      by: OrderBy.DESC,
      skip: From.DEFAULT,
      take: Limit.DEFAULT,
      storeId: listStore[0].id,
    };
    setFormKey(formKey + 1);
    handleChangeMode(ENUM_STATE_UPDATE_O2O.NORMAL);
    onDataStateChange(resetDataState);
  };
  const queryClient = useQueryClient();
  const callbackFuncUpdateToO2O = {
    handleRequestSuccess: (data: object) => {
      try {
        LoggerService.debug(
          'FormToolbarListGoodO2O execute callbackFuncUpdateToO2O.handleRequestSuccess receive response',
          data,
        );
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid='productInventory.updateToO2OSuccess' />);
        handleResetListGoodsUpdateO2O();
        queryClient.invalidateQueries(['delete', config.api.lsProduct.product]);
      } catch (error: any) {
        LoggerService.error(
          'FormToolbarListGoodO2O execute callbackFuncUpdateToO2O.handleRequestSuccess receive error',
          error,
        );
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('FormToolbarListGoodO2O execute callbackFuncUpdateToO2O.handleRequestError');
      } catch (error: any) {
        LoggerService.error(
          'FormToolbarListGoodO2O execute callbackFuncUpdateToO2O.handleRequestError receive error',
          error,
        );
      }
    },
  };
  const { isLoading: isUpdateToO2OLoading, mutate: mutateUpdateToO2O } = useRequest(
    apiUpdateToO2O,
    callbackFuncUpdateToO2O,
  );
  const handleUpdateToO2O = useCallback(
    (storeId: string | number) => {
      try {
        LoggerService.info('FormToolbarListGoodO2O execute handleUpdateToO2O');
        const payload = {
          goodsId: listGoodsUpdateStateO2O,
          isO2O: STATUS_PUBLISH_O2O.ISO2O,
          storeId: storeId || listStore[0]?.id,
        };
        mutateUpdateToO2O(payload);
      } catch (error: any) {
        LoggerService.error('FormToolbarListGoodO2O execute handleUpdateToO2O receive error', error);
      }
    },
    [listGoodsUpdateStateO2O],
  );

  const handleUpdateToLocal = useCallback(
    (storeId: string | number) => {
      try {
        LoggerService.info('FormToolbarListGoodO2O execute handleUpdateToLocal');
        const payload = {
          goodsId: listGoodsUpdateStateO2O,
          isO2O: STATUS_PUBLISH_O2O.LOCAL,
          storeId: storeId || listStore[0]?.id,
        };
        mutateUpdateToO2O(payload);
      } catch (error: any) {
        LoggerService.error('FormToolbarListGoodO2O execute handleUpdateToLocal receive error', error);
      }
    },
    [listGoodsUpdateStateO2O],
  );
  return (
    <Form
      onSubmitClick={(data: any) => {
        handleSubmitFormPublishO2O(data.values);
      }}
      initialValues={{
        isO2O: itemsDropdownO2OStatus[0],
        store: listStore[0],
      }}
      key={formKey}
      render={(props: FormRenderProps) => {
        return (
          <FormElement>
            <div className='ls-flex ls-gap_2 ls-items_end'>
              {/* <div className='ls-w_48'>
                <DropDownRoot
                  label={'store.title'}
                  id='store'
                  name='store'
                  isForm
                  data={listStore}
                  defaultValue={listStore[0]}
                />
              </div> */}
              <div className='ls-w_48'>
                <DropDownRoot
                  label='productInventory.stateO2O'
                  id='isO2O'
                  name='isO2O'
                  isForm
                  defaultValue={itemsDropdownO2OStatus[0]}
                  data={itemsDropdownO2OStatus}
                />
              </div>
              <div className='ls-w_48'>
                <DropDownRoot
                  isForm
                  id='search'
                  data={itemsDropdownGoodPublishO2O}
                  name={'search'}
                />
              </div>
              <div className='ls-flex'>
                <InputRoot
                  id='searchValue'
                  name='searchValue'
                  placeholder={'Enter Value'}
                />
              </div>
              <ButtonRoot
                icon='zoom'
                type='submit'>
                <span className='ls-px_sm'>
                  <Localize tid='search' />
                </span>
              </ButtonRoot>
              <ButtonRoot
                onClick={() => {
                  handleResetO2OList();
                }}
                type='button'
                icon='reset'
                className='ls-h_14'>
                <span className='ls-px_sm'>
                  <Localize tid='reset' />
                </span>
              </ButtonRoot>
            </div>
            <div className='ls-flex ls-mt_larger ls-justify_between ls-mb_larger ls-w_full ls-items_end'>
              <div className='ls-w_48'>
                {props.valueGetter('isO2O')?.id === STATUS_PUBLISH_O2O.ISO2O && listGoodsUpdateStateO2O.length > 0 && (
                  <ButtonRoot
                    type='button'
                    icon='sort-desc-sm'
                    className='ls-h_14'
                    onClick={() => {
                      handleUpdateToLocal(props.valueGetter('store')?.id);
                    }}>
                    <span className='ls-px_sm'>
                      <Localize tid='productInventory.updateToLocal' />
                    </span>
                  </ButtonRoot>
                )}

                {props.valueGetter('isO2O')?.id === STATUS_PUBLISH_O2O.LOCAL && listGoodsUpdateStateO2O.length > 0 && (
                  <ButtonRoot
                    type='button'
                    icon='sort-asc-sm'
                    className='ls-ml_auto ls-h_14'
                    disabled={isUpdateToO2OLoading}
                    onClick={() => {
                      handleUpdateToO2O(props.valueGetter('store')?.id);
                    }}>
                    <span className='ls-px_sm'>
                      <Localize tid='productInventory.updateToO2O' />
                    </span>
                  </ButtonRoot>
                )}
              </div>
            </div>
          </FormElement>
        );
      }}
    />
  );
}

export default FormToolbarListGoodO2O;
