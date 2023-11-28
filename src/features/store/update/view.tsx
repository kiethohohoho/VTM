/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardPage } from '@/core2/card';
import { DropDownRoot } from '@/core2/dropdown';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot } from '@/core2/input';
import { LoaderRoot } from '@/core2/loader';
import { SwitchRoot as SwitchRootUpdateStore } from '@/core2/switch';
import { EnumCountry } from '@/utils/Enums';

import { type IResponseDetail } from '../detail/component';

interface ViewProps {
  detail: IResponseDetail | null;
  loading: boolean;
  loadingUpdate: boolean;
  handleSubmitUpdate: (dataItem: Record<string, string>) => void;
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

const ViewUpdateStore: FunctionComponent<ViewProps> = ({ loadingUpdate, detail, loading, handleSubmitUpdate }) => {
  return loading ? (
    <LoaderRoot />
  ) : (
    detail && (
      <CardPage>
        <section className='ls-flex ls-flex-col ls-gap_3'>
          <section className='ls-px_larger'>
            <article className='ls-py_medium ls-mb_medium ls-bd_b'>
              <h2>
                <Localize tid='store.updateTitle' />
              </h2>
            </article>
            <Form
              key={`${detail.storeId}`}
              initialValues={{
                address: detail.address,
                country: listCountry.find(item => item.id.toString() === detail.countryCode),
                createdAt: detail.createdAt,
                createdBy: detail.createdBy,
                // districtCode: detail.districtCode,
                isOnline: detail.isOnline,
                license: detail.license,
                modifiedAt: detail.modifiedAt,
                modifiedBy: detail.modifiedBy,
                name: detail.name,
                nameOwner: detail.nameOwner,
                residence: detail.residence,
                status: detail.status,
                taxNumber: detail.taxNumber,
                userId: detail.userId,
                shopName: detail.shopName,
              }}
              onSubmit={handleSubmitUpdate}
              render={(formRenderProps: FormRenderProps) => (
                <FormElement>
                  <div className='ls-pt_larger ls-flex ls-gap_3 ls-w_full ls-grid ls-grid-col-2'>
                    <InputRoot
                      label={'store.storeName'}
                      id='name'
                      name='name'
                    />
                    <InputRoot
                      label={'taxNumber'}
                      id='taxNumber'
                      name='taxNumber'
                      disabled
                    />
                    {/* <InputRoot
                      label={'classification'}
                      id='classification'
                      name='classification'
                    /> */}
                    <InputRoot
                      label={'license'}
                      id='license'
                      name='license'
                    />
                    {/* <InputRoot
                      label={'nationalityLicense'}
                      id='nationalityLicense'
                      name='nationalityLicense'
                      validatorTypes={ValidatorService.requiredValidator}
                      disabled
                    /> */}
                    {/* <InputRoot
                      label={'companyName'}
                      id='companyName'
                      name='companyName'
                      validatorTypes={ValidatorService.requiredValidator}
                      disabled
                    /> */}
                    <div className='ls-my_larger'>
                      <SwitchRootUpdateStore
                        isForm
                        name='isOnline'
                        label={<Localize tid='store.isOnline' />}
                      />
                    </div>
                    <InputRoot
                      label={'address'}
                      id='address'
                      name='address'
                    />
                    {/* <InputRoot
                      label={'cover'}
                      id='cover'
                      name='cover'
                    /> */}
                    {/* <InputRoot
                      label={'photo'}
                      id='photo'
                      name='photo'
                    /> */}
                    <InputRoot
                      label={'store.shopName'}
                      id='shopName'
                      name='shopName'
                    />
                    {/* <InputRoot
                      label={'description'}
                      id='description'
                      name='description'
                    /> */}
                    {/* <InputRoot
                      label={'registeredAt'}
                      id='registeredAt'
                      name='registeredAt'
                      validatorTypes={ValidatorService.requiredValidator}
                      disabled
                    /> */}
                    {/* <InputRoot
                      label={'under'}
                      id='under'
                      name='under'
                      validatorTypes={ValidatorService.requiredValidator}
                      disabled
                    /> */}
                    {/* <InputRoot
                      label={'formOfEnterprise'}
                      id='formOfEnterprise'
                      name='formOfEnterprise'
                      validatorTypes={ValidatorService.requiredValidator}
                      disabled
                    /> */}
                    {/* <InputRoot
                      label={'mainBusiness'}
                      id='mainBusiness'
                      name='mainBusiness'
                      validatorTypes={ValidatorService.requiredValidator}
                      disabled
                    /> */}
                    <InputRoot
                      label={'nameOwner'}
                      id='nameOwner'
                      name='nameOwner'
                      disabled
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
                      disabled
                    />
                    {/* <InputRoot
                      id='phone'
                      name={'phone'}
                      label={'phone'}
                    /> */}
                    <DropDownRoot
                      name='country'
                      id='country'
                      isForm
                      data={listCountry}
                      // onGetValue={(id: string, value: string) => {}}
                      label={'country'}
                    />
                    {/* <InputRoot
                      id='cityCode'
                      name={'cityCode'}
                      label={'city'}
                    /> */}
                    {/* <InputRoot
                      id='districtCode'
                      name={'districtCode'}
                      label={'district'}
                    /> */}
                    {/* <InputRoot
                      id='wardCode'
                      name={'wardCode'}
                      label={'ward'}
                    /> */}
                  </div>
                  {/* <h3>
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
                  </div> */}
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
          </section>
        </section>
      </CardPage>
    )
  );
};

export default ViewUpdateStore;
