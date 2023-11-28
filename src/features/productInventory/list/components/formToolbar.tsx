import { Form, FormElement } from '@progress/kendo-react-form';
import { useContext, useState } from 'react';

import { ContextModal } from '@/context/dialog';
import { TYPE_DIALOG, TYPE_MODAL } from '@/context/dialog/dialog.interface';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import ButtonDropDown, { type IItemsButtonDropdown } from '@/core2/button/dropdown';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
import { type IState, type IToolBarProps } from '@/core2/table/request';
import { getListStore } from '@/features/common/getListStore';
import { From, Limit, Order, OrderBy } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';
interface IParametersHandleSubmit {
  search: IItemDataDropDown;
  store: IItemDataDropDown;
  searchValue: string;
}
enum IMPORT_MODE {
  BY_BARCODE = 1,
  DEFAULT,
}

interface IFormToolbarProductInventoryList extends IToolBarProps {
  handleChangeStore: (storeId: string | number) => void;
}
function FormToolbarProductInventoryList({
  dataState,
  onDataStateChange,
  handleChangeStore,
}: IFormToolbarProductInventoryList) {
  const { onSetView } = useContext(ContextModal);
  const { listStore } = getListStore();
  const [formKey, setFormKey] = useState<number>(1);

  /* variable */
  const itemsDropdownProductDictionary: IItemDataDropDown[] = [
    {
      id: 'productDictionary.name',
      text: 'productInventory.name',
    },
    {
      id: 'productDictionary.barcode',
      text: 'barcode',
    },
  ];

  /* handle */
  const handleSubmitForm = ({ search, searchValue, store }: IParametersHandleSubmit) => {
    const newDataState: IState & Record<string, any> = {
      ...dataState,
      search: search?.id,
      searchValue,
      storeId: store?.id || listStore[0]?.id,
    };
    onDataStateChange(Helper.removeObjectEmpty(newDataState));
  };
  const handleResetStore = () => {
    const resetDataState: IState & Record<string, any> = {
      order: Order.CREATED_AT,
      by: OrderBy.DESC,
      skip: From.DEFAULT,
      take: Limit.DEFAULT,
      storeId: listStore[0]?.id,
    };
    setFormKey(formKey + 1);
    onDataStateChange(resetDataState);
  };

  const onImportProductClick = ({ label, value }: IItemsButtonDropdown) => {
    switch (value) {
      case IMPORT_MODE.BY_BARCODE:
        onSetView({
          titleDialog: <Localize tid='productInventory.importGoods' />,
          typeDialog: TYPE_DIALOG.IMPORT_GOODS_BAR_CODE,
          typeModel: TYPE_MODAL.CUSTOM,
          onSubmit: () => null,
        });
        break;
      case IMPORT_MODE.DEFAULT:
        LoggerService.info(`Default action check`);
        break;
      default:
        throw new Error('Not found value');
    }
  };
  return (
    <Form
      onSubmitClick={(data: any) => {
        handleSubmitForm(data.values);
      }}
      initialValues={{
        store: listStore[0],
      }}
      key={formKey}
      render={() => (
        <FormElement>
          <div className='ls-flex ls-gap_2 ls-items_end ls-mb_larger'>
            {/* <div className='ls-w_48'>
              <DropDownRoot
                label={'store.title'}
                id='store'
                name='store'
                isForm
                data={listStore}
                defaultValue={listStore[0]}
                onGetValue={(id: string, value: string) => {
                  handleChangeStore(value);
                }}
              />
            </div> */}
            <div className='ls-w_48'>
              <DropDownRoot
                isForm
                id='search'
                name='search'
                data={itemsDropdownProductDictionary}
              />
            </div>
            <div className='ls-flex'>
              <InputRoot
                id='searchValue'
                name='searchValue'
                placeholder={'enterValue'}
              />
            </div>
            <ButtonRoot
              icon='zoom'
              type='submit'
              className='ls-h_14'>
              <span className='ls-px_sm'>
                <Localize tid='search' />
              </span>
            </ButtonRoot>
            <ButtonRoot
              onClick={handleResetStore}
              icon='reset'
              type='submit'
              className='ls-h_14'>
              <span className='ls-px_sm'>
                <Localize tid='reset' />
              </span>
            </ButtonRoot>
            <ButtonDropDown
              items={[
                { label: 'Default', value: IMPORT_MODE.DEFAULT },
                { label: 'By barcode', value: IMPORT_MODE.BY_BARCODE },
              ]}
              icon='plus'
              className='ls-ml_auto ls-h_14'
              onItemClick={onImportProductClick}
              text={
                <span className='ls-px_sm'>
                  <Localize tid='import' />
                </span>
              }></ButtonDropDown>
          </div>
        </FormElement>
      )}
    />
  );
}

export default FormToolbarProductInventoryList;
