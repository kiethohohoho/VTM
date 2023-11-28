import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { useNavigate } from 'react-router-dom';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { InputRoot } from '@/core2/input';
import LayoutAuthTitle from '@/layouts/auth2/components/title';
import { EnumPath } from '@/utils/Enums';
import ValidatorComponent, { VALIDATOR } from '@/utils/Validation';

import { type IFormValueRegisterOTP } from '../type';

interface IFormRegisterOTP {
  handleNavigate: (url: string) => void;
  loading: boolean;
  handleSubmit: (values: Record<string, IFormValueRegisterOTP>) => void;
}

const View = ({ handleNavigate, handleSubmit, loading }: IFormRegisterOTP) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-column justify-between h-full items-center'>
      <div className='text-center pt-8'>
        <LayoutAuthTitle title='registerOTP' />
      </div>
      <div
        className='pb-28'
        style={{
          width: 350,
        }}>
        <Form
          validator={(values: any) =>
            ValidatorComponent({
              values,
              validators: {
                phone: [VALIDATOR.EMPTY],
              },
            })
          }
          onSubmit={handleSubmit}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement>
              <div className='w-full grid grid-cols-1 gap-5'>
                <InputRoot
                  name={'phone'}
                  label={'phoneNumber'}
                />

                <ButtonRoot
                  className='w-full'
                  size='large'
                  text='confirm'
                  themeColor='primary'
                  disabled={!formRenderProps.valid}
                  type='submit'
                />
              </div>
            </FormElement>
          )}
        />
      </div>
      <div className='p-16'>
        <Localize tid='account.haveAnAccount' />
        <span
          onClick={() => {
            navigate(EnumPath.LOGIN);
          }}
          className='px-2 text-primary font-bold cursor-pointer'>
          <Localize tid='account.login.here' />
        </span>
      </div>
    </div>
  );
};
export default View;
