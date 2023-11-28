import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

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
const ProfileForm = ({ data }: IFormInformation) => {
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
  const profileDetails = AuthService.getPackageProfile();
  const queryClient = useQueryClient();

  const [editData, setEditData] = useState<IDataItemForm>({
    dob: profileDetails.dob,
    email: profileDetails.email,
    gender: profileDetails.gender,
    name: profileDetails.name,
  });
  /* call API */
  const funcRequest = {
    handleRequestSuccess: (data: IItemResponse) => {
      try {
        LoggerService.debug('ListComponent execute handleRequestSuccess receive list', data);
        const expiredAt = AuthService.getPackageExpiredAt();
        queryClient.invalidateQueries(['get', config.api.lsUser.kyc.profile]);

        AuthService.setPackageProfile(
          {
            ...profileDetails,
            cusName: editData.name,
            dob: editData.dob,
            gender: editData.gender,
            email: editData.email,
          },
          expiredAt,
        );
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
    setEditData({ dob, gender, name, email });
    mutate({
      dob: Helper.dateTimeToMilliseconds(dob),
      gender,
      name,
      email,
    });
  };
  const NationalIDType = listNationalIDType.find(item => item.id === data.nationalIDType);
  return (
    <section className='pt_medium'>
      <article className='bd_b py_medium flex justify_between mb_medium'>
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
              <div className='flex flex-column gap-3'>
                <div className='flex gap-10 mt-2 items-center'>
                  <div className='flex-1'>
                    <span className='text_align_start'>
                      <Localize tid={'profile.fieldName'} />:
                    </span>
                    <div>
                      <InputRoot
                        id='name'
                        name='name'
                      />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <span className='text_align_start'>
                      <Localize tid={'dateOfbBirth'} /> :
                    </span>
                    <div>
                      <DatePickerRoot
                        size={'medium'}
                        id='dob'
                        name='dob'
                        isForm
                      />
                    </div>
                  </div>
                </div>
                <div className='flex gap-10 mt-2 items-center'>
                  <div>
                    <span className='text_align_start'>
                      <Localize tid={'gender'} />:
                    </span>

                    <RadioGroupRoot
                      data={listGender}
                      id='gender'
                      layout='horizontal'
                      name='gender'
                      isForm
                    />
                  </div>
                </div>
                <div className='flex gap-10 mt-2 items-center'>
                  <div className='flex-1'>
                    <span className='text_align_start'>
                      <Localize tid={'email'} />:
                    </span>
                    <div>
                      <InputRoot
                        id='email'
                        name='email'
                      />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <span className='text_align_start'>
                      <Localize tid={'phoneNumber'} />:
                    </span>
                    <div>
                      <InputRoot
                        placeholder='enterValue'
                        id='phone'
                        name='phone'
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className='flex gap-10 mt-2 items-center'>
                  <div className='flex-1'>
                    <span className='text_align_start'>
                      <Localize tid={'nationalIDType'} />:
                    </span>
                    <div>
                      <InputRoot
                        disabled
                        id='nationalIDType'
                        name='nationalIDType'
                      />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <span className='text_align_start'>
                      <Localize tid={'nationalID'} />:
                    </span>
                    <div>
                      <InputRoot
                        disabled
                        id='nationalID'
                        name='nationalID'
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <span className='text_align_start'>
                    <Localize tid={'contactAddress'} />:
                  </span>
                  <div>
                    <InputRoot
                      disabled
                      id='contactAddress'
                      name='contactAddress'
                    />
                  </div>
                </div>
                <div className='flex justify_end'>
                  <ButtonRoot
                    type='submit'
                    disabled={!formRenderProps.allowSubmit}
                    className='w_36'
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

export { ProfileForm };
