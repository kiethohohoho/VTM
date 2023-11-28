import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import React from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import Config from '@/Config';
import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { DatePickerRoot } from '@/core2/datepicker';
import { type IItemDataDropDown } from '@/core2/dropdown/type';
import { InputRoot, RadioGroupRoot } from '@/core2/input';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import AuthService from '@/utils/Auth';
import { EnumGender, EnumNationalIDType } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { type IItemResponse } from '../component';

interface IFormInformation {
  data: IItemResponse;
}
interface IDataItemForm {
  name: string;
  dob: any;
  email: string;
  gender: EnumGender;
}

const config = new Config().getState();
const FormInformation = ({ data }: IFormInformation) => {
  /* variable */
  const listGender = [
    {
      value: EnumGender.MALE,
      label: 'male',
    },
    {
      value: EnumGender.FEMALE,
      label: 'female',
    },
  ];
  const listNationalIDType: IItemDataDropDown[] = [
    {
      id: EnumNationalIDType.CCCD,
      text: 'cccd',
    },
    {
      id: EnumNationalIDType.CMND,
      text: 'cmnd',
    },
    {
      id: EnumNationalIDType.PASSPORT,
      text: 'passport',
    },
    {
      id: EnumNationalIDType.NATIONAL_ID,
      text: 'nationalID',
    },
  ];
  const auth = AuthService.getPackageAuth();
  const api: IApiRequest = {
    method: 'post',
    url: config.api.lsUser.kyc.profile,
    headers: { token: auth?.token },
  };

  /* call API */
  const funcRequest = {
    handleRequestSuccess: (data: IItemResponse) => {
      try {
        LoggerService.debug('ListComponent execute handleRequestSuccess receive list', data);
        toastDefault(ENUMS_TOAST.SUCCESS, 'Update success!!');
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('ListComponent execute handleRequestSuccess receive list');
        toastDefault(ENUMS_TOAST.ERROR, 'You can update failed!!');
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestError receive error', error);
      }
    },
  };
  const { mutate, isLoading } = useRequest(api, funcRequest);
  /* handel */
  const handleUpdateProfile = ({ dob, gender, name, email }: IDataItemForm) => {
    mutate({
      dob: Helper.dateTimeToMilliseconds(dob),
      gender,
      name,
      email,
    });
  };
  const NationalIDType = listNationalIDType.find(item => item.id === data.nationalIDType);
  return (
    <section className='ls-pt_medium ls-profile-grid_col1-3'>
      <article className='ls-bd_b ls-py_medium ls-flex ls-justify_between ls-mb_medium'>
        <div>
          <h3>
            <Localize tid={'profile.detailTitle'} />
          </h3>
          <span>
            <Localize tid={'profile.detailSubTitle'} />
          </span>
        </div>
      </article>
      <Form
        onSubmitClick={(data: any) => {
          handleUpdateProfile(data.values);
        }}
        key={`${data.userId}`}
        initialValues={{
          name: data.name,
          phone: data?.phone,
          dob: Helper.convertToDate(data.dob),
          email: data.email,
          gender: data.gender,
          nationalIDType: NationalIDType?.text,
          nationalID: data.nationalID,
          contactAddress: data.contactAddress,
        }}
        render={(formRenderProps: FormRenderProps) => {
          return (
            <FormElement>
              <div className='ls-pt_larger ls-flex ls-flex-col ls-gap_3 ls-profile_widthForm'>
                <div className='ls-profile-grid_col3 ls-items_center'>
                  <span className='ls-text_align_start'>
                    <Localize tid={'profile.fieldName'} />:
                  </span>
                  <div className='ls-profile-grid_col1-3'>
                    <InputRoot
                      id='name'
                      name='name'
                    />
                  </div>
                </div>
                <div className='ls-profile-grid_col3 ls-items_center'>
                  <span className='ls-text_align_start'>
                    <Localize tid={'dateOfbBirth'} /> :
                  </span>
                  <div className='ls-profile-grid_col1-3'>
                    <DatePickerRoot
                      size={'medium'}
                      isForm
                      id='dob'
                      name='dob'
                    />
                  </div>
                </div>
                <div className='ls-profile-grid_col3 ls-items_center'>
                  <span className='ls-text_align_start'>
                    <Localize tid={'gender'} />:
                  </span>

                  <RadioGroupRoot
                    data={listGender}
                    id='gender'
                    layout='horizontal'
                    name='gender'
                    isForm={true}
                  />
                </div>
                <div className='ls-profile-grid_col3 ls-items_center'>
                  <span className='ls-text_align_start'>
                    <Localize tid={'email'} />:
                  </span>
                  <div className='ls-profile-grid_col1-3'>
                    <InputRoot
                      id='email'
                      name='email'
                    />
                  </div>
                </div>
                <div className='ls-profile-grid_col3 ls-items_center'>
                  <span className='ls-text_align_start'>
                    <Localize tid={'phoneNumber'} />:
                  </span>
                  <div className='ls-profile-grid_col1-3'>
                    <InputRoot
                      placeholder='enterValue'
                      id='phone'
                      name='phone'
                      disabled
                    />
                  </div>
                </div>

                <div className='ls-profile-grid_col3 ls-items_center'>
                  <span className='ls-text_align_start'>
                    <Localize tid={'nationalIDType'} />:
                  </span>
                  <div className='ls-profile-grid_col1-3'>
                    <InputRoot
                      disabled
                      id='nationalIDType'
                      name='nationalIDType'
                    />
                  </div>
                </div>
                <div className='ls-profile-grid_col3 ls-items_center'>
                  <span className='ls-text_align_start'>
                    <Localize tid={'nationalID'} />:
                  </span>
                  <div className='ls-profile-grid_col1-3'>
                    <InputRoot
                      disabled
                      id='nationalID'
                      name='nationalID'
                    />
                  </div>
                </div>
                <div className='ls-profile-grid_col3 ls-items_center'>
                  <span className='ls-text_align_start'>
                    <Localize tid={'contactAddress'} />:
                  </span>
                  <div className='ls-profile-grid_col1-3'>
                    <InputRoot
                      disabled
                      id='contactAddress'
                      name='contactAddress'
                    />
                  </div>
                </div>
                <div className='ls-flex ls-justify_end'>
                  <ButtonRoot
                    type='submit'
                    disabled={!formRenderProps.allowSubmit}
                    className='ls-w_36'
                    loading={isLoading}>
                    <Localize tid={'profile.submit'} />
                  </ButtonRoot>
                </div>
              </div>
            </FormElement>
          );
        }}
      />
    </section>
  );
};

export default React.memo(FormInformation);
