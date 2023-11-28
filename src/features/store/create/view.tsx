import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import React, { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import CardForm from '@/core2/card/form';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
import { SwitchRoot } from '@/core2/switch';
import WrapperMain from '@/features/components/waraper';
import { EnumCountry, STATUS_YES_NO } from '@/utils/Enums';

interface ViewProps {
  handleSubmitCreate: (dataItem: Record<string, any>) => void;
  loading: boolean;
}
const listCountry: IItemDataDropDown[] = [
  {
    id: EnumCountry.VIETNAM,
    text: 'Vietnam',
  },
  {
    id: EnumCountry.CAMBODIA,
    text: 'Cambodia',
  },
  {
    id: EnumCountry.THAILAND,
    text: 'Thailand',
  },
  {
    id: EnumCountry.SINGAPORE,
    text: 'Singapore',
  },
];

const ViewCreateStore: FunctionComponent<ViewProps> = ({ handleSubmitCreate, loading }) => {
  return (
    <React.Fragment>
      <WrapperMain>
        <CardForm>
          <Form
            initialValues={{
              isOnline: Boolean(STATUS_YES_NO.NO),
            }}
            onSubmit={handleSubmitCreate}
            render={(formRenderProps: FormRenderProps) => (
              <FormElement>
                <div className='grid grid-cols-2 gap-5'>
                  <InputRoot
                    label={'store.storeName'}
                    id='name'
                    name='name'
                    required
                  />
                  <InputRoot
                    label={'taxNumber'}
                    id='taxNumber'
                    name='taxNumber'
                    required
                  />
                  <InputRoot
                    label={'classification'}
                    id='classification'
                    name='classification'
                  />
                  <InputRoot
                    label={'license'}
                    id='license'
                    name='license'
                  />
                  <InputRoot
                    label={'nationalityLicense'}
                    id='nationalityLicense'
                    name='nationalityLicense'
                    required
                  />
                  <InputRoot
                    label={'companyName'}
                    id='companyName'
                    name='companyName'
                    required
                  />
                  <div className='ls-my_larger'>
                    <SwitchRoot
                      isForm
                      name='isOnline'
                      label={<Localize tid='store.isOnline' />}
                    />
                  </div>
                  <InputRoot
                    label={'address'}
                    id='address'
                    name='address'
                    required
                  />
                  <InputRoot
                    label={'cover'}
                    id='cover'
                    name='cover'
                  />
                  <InputRoot
                    label={'photo'}
                    id='photo'
                    name='photo'
                  />
                  <InputRoot
                    label={'store.shopName'}
                    id='shopName'
                    name='shopName'
                  />
                  <InputRoot
                    label={'description'}
                    id='description'
                    name='description'
                  />
                  <InputRoot
                    label={'registeredAt'}
                    id='registeredAt'
                    name='registeredAt'
                    required
                  />
                  <InputRoot
                    label={'under'}
                    id='under'
                    name='under'
                    required
                  />
                  <InputRoot
                    label={'formOfEnterprise'}
                    id='formOfEnterprise'
                    name='formOfEnterprise'
                    required
                  />
                  <InputRoot
                    label={'mainBusiness'}
                    id='mainBusiness'
                    name='mainBusiness'
                    required
                  />
                  <InputRoot
                    label={'nameOwner'}
                    id='nameOwner'
                    name='nameOwner'
                    required
                  />
                  {/* <InputRoot
                  id='businessName'
                  name={'businessName'}
                  label={'businessName'}
                /> */}
                  {/* <DatePickerRoot
                  max={new Date()}
                  size={'medium'}
                  isForm
                  id='establishment'
                  label={'Establishment'}
                  name='establishment'
                /> */}
                  {/* <DatePickerRoot
                  max={new Date()}
                  size={'medium'}
                  isForm
                  id='issueDate'
                  label={'issueDate'}
                  name='issueDate'
                /> */}
                  <InputRoot
                    id='residence'
                    name={'residence'}
                    label={'residence'}
                    required
                  />
                  <InputRoot
                    id='phone'
                    name={'phone'}
                    label={'phone'}
                  />
                  <DropDownRoot
                    name='country'
                    id='country'
                    isForm
                    data={listCountry}
                    // onChange={(id: string, value: string) => {}}
                    label={'country'}
                  />
                  {/* <InputRoot
                  id='cityCode'
                  name={'cityCode'}
                  label={'city'}
                />
                <InputRoot
                  id='districtCode'
                  name={'districtCode'}
                  label={'district'}
                />
                <InputRoot
                  id='wardCode'
                  name={'wardCode'}
                  label={'ward'}
                /> */}
                </div>
                <h3>
                  <Localize tid={'store.wareHouse'} />
                </h3>
                <div className='ls-flex ls-gap_4'>
                  <InputRoot
                    label={'wareHouse.name'}
                    id='wareHouseName'
                    name='wareHouseName'
                  />
                  <InputRoot
                    label={'store.wareHouseAddress'}
                    id='wareHouseAddress'
                    name='wareHouseAddress'
                  />
                </div>
                <div className='ls-flex ls-justify_end ls-mt_larger'>
                  <ButtonRoot
                    type='submit'
                    disabled={!formRenderProps.valid}
                    className='ls-w_36'
                    loading={loading}>
                    <Localize tid={'profile.submit'} />
                  </ButtonRoot>
                </div>
              </FormElement>
            )}
          />
        </CardForm>
      </WrapperMain>
    </React.Fragment>
  );
};

export default ViewCreateStore;
