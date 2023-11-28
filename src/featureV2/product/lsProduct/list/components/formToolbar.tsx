import { Form, FormElement } from '@progress/kendo-react-form';
import { useContext, useEffect, useState } from 'react';

import { ContextModal } from '@/context/dialog';
import { TYPE_DIALOG, TYPE_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputRoot } from '@/core2/input';
import { type IListTabStatus, TabStatusTable } from '@/core2/table/components/tabStatusTable';
import { type IState, type IToolBarProps } from '@/core2/table/request';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { productService } from '@/featureV2/product/service';
import { useDebounce } from '@/hooks/useDebounce';
import { useFirstRender } from '@/hooks/useFirstRender';
import AuthService from '@/utils/Auth';
import { ENUM_PARSE_STATUS_GOODS, STATUS_GOODS, STATUS_PUBLISH_O2O } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

const listTabStatus: IListTabStatus = [
  {
    name: `goods.list.${ENUM_PARSE_STATUS_GOODS[STATUS_GOODS.APPROVED]}`,
    value: STATUS_GOODS.APPROVED,
  },
  {
    name: `goods.list.${ENUM_PARSE_STATUS_GOODS[STATUS_GOODS.WAITING]}`,
    value: STATUS_GOODS.WAITING,
  },
  {
    name: `goods.list.${ENUM_PARSE_STATUS_GOODS[STATUS_GOODS.CANCELED]}`,
    value: STATUS_GOODS.CANCELED,
  },
];
function FormToolbarListProduct({
  dataState,
  onDataStateChange,
  selectedDataId = [],
  setSelectedState,
}: IToolBarProps) {
  const [searchValue, setSearchValue] = useState<string>();
  const firstRender = useFirstRender();
  const debounceSearchValue = useDebounce(searchValue, 500);
  useEffect(() => {
    if (!firstRender) {
      const newDataState: IState = {
        ...dataState,
      };
      if (Helper.isEmpty(debounceSearchValue)) {
        newDataState.search = '';
        newDataState.searchValue = '';
      } else {
        newDataState.search = 'productDictionary.name';
        newDataState.searchValue = debounceSearchValue;
      }
      onDataStateChange(Helper.removeObjectEmpty(newDataState));
    }
  }, [debounceSearchValue]);

  const handleFilterProductStatus = (filterValue?: number | string) => {
    onDataStateChange(
      Helper.removeObjectEmpty({
        ...dataState,
        fil: !Helper.isEmpty(filterValue) ? 'goods.status' : '',
        filterValue: (filterValue as string).toString(),
      }),
    );
  };
  const { onSetView } = useContext(ContextModal);

  const handleStatusGoodsO2O = (status: STATUS_PUBLISH_O2O) => {
    if (selectedDataId?.length < 1) {
      toastDefault(ENUMS_TOAST.WARNING, <Localize tid={'pleaseSelectProduct'}></Localize>);
    } else {
      const { storeId } = AuthService.getPackageProfile();
      const payload = {
        storeId,
        goodsId: selectedDataId,
        isO2O: status,
      };
      mutateUpdateGoodsO2O(payload);
    }
  };

  const callbackUpdateGoodsO2O = () => {
    try {
      LoggerService.info('FormToolbarListProduct execute callbackUpdateGoodsO2O');
      setSelectedState && setSelectedState({});
    } catch (error: any) {
      LoggerService.error(
        'FormToolbarListGoodO2O execute callbackFuncUpdateToO2O.handleRequestError receive error',
        error.toString(),
      );
    }
    setSelectedState && setSelectedState({});
  };

  const { mutateUpdateGoodsO2O, isUpdateGoodsO2OLoading } = productService({
    callbackUpdateGoodsO2O,
  });

  return (
    <div className='px-10 pb-6'>
      <TabStatusTable
        listTabStatus={listTabStatus}
        currentStatus={dataState.filterValue}
        handleFilterStatus={handleFilterProductStatus}
      />
      <Form
        render={() => {
          return (
            <FormElement>
              <div className='flex justify-between xl:justify-start xl:gap-5'>
                <div className='w-80 xl:w-56'>
                  <InputRoot
                    name='search'
                    id='search'
                    placeholder={'search'}
                    onChange={e => {
                      setSearchValue(e.target.value as string);
                    }}
                  />
                </div>
                <div className='flex gap-3 items-center'>
                  <ButtonRoot
                    themeColor={'primary'}
                    text='product.updateToLocal'
                    loadingThemeColor='light'
                    onClick={() => {
                      handleStatusGoodsO2O(STATUS_PUBLISH_O2O.LOCAL);
                    }}
                    loading={isUpdateGoodsO2OLoading}
                  />
                  <ButtonRoot
                    themeColor={'primary'}
                    loadingThemeColor='light'
                    text='product.updateToO2O'
                    onClick={() => {
                      handleStatusGoodsO2O(STATUS_PUBLISH_O2O.ISO2O);
                    }}
                    loading={isUpdateGoodsO2OLoading}
                  />
                  <ButtonRoot
                    themeColor={'primary'}
                    icon='plus'
                    onClick={() => {
                      onSetView({
                        titleDialog: <Localize tid='product.importGoods' />,
                        typeDialog: TYPE_DIALOG.IMPORT_GOODS_BAR_CODE,
                        typeModel: TYPE_MODAL.CUSTOM,
                        onSubmit: () => null,
                      });
                    }}>
                    <Localize tid={'import'}></Localize>
                  </ButtonRoot>
                </div>
              </div>
            </FormElement>
          );
        }}
      />
    </div>
  );
}

export { FormToolbarListProduct };
