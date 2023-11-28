import { Form, FormElement, type FormRenderProps } from '@progress/kendo-react-form';
import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { CardForm } from '@/core2/card';
import { InputRoot } from '@/core2/input';
import ValidatorComponent, { VALIDATOR } from '@/utils/Validation';

import { type IFormInviteStaff } from '../types';
interface IViewInviteStaff {
  handleSubmitInviteStaff: (values: Record<string, IFormInviteStaff>) => void;
  isLoading: boolean;
}

const ViewInviteStaff: FunctionComponent<IViewInviteStaff> = ({
  isLoading,
  handleSubmitInviteStaff,
}: IViewInviteStaff) => {
  return (
    <CardForm>
      <div className='w-80 xl:w-full'>
        <h2>
          <Localize tid='groupStaff.inviteStaff' />
        </h2>
        <Form
          validator={(values: any) =>
            ValidatorComponent({
              values,
              validators: {
                name: [VALIDATOR.EMPTY],
                phone: [VALIDATOR.EMPTY],
              },
            })
          }
          onSubmit={handleSubmitInviteStaff}
          render={(formRenderProps: FormRenderProps) => {
            return (
              <FormElement>
                <div className='flex flex-column gap-2 items-end'>
                  <InputRoot
                    label={'fullName'}
                    id='name'
                    name='name'
                  />
                  <InputRoot
                    label={'phoneNumber'}
                    id='phone'
                    name='phone'
                  />
                  <ButtonRoot
                    loading={isLoading}
                    size={'medium'}
                    themeColor={'primary'}
                    className='w-40'
                    type='submit'
                    disabled={!formRenderProps.valid}>
                    <Localize tid={'create'} />
                  </ButtonRoot>
                </div>
              </FormElement>
            );
          }}
        />
      </div>
    </CardForm>
  );
};

export default ViewInviteStaff;
