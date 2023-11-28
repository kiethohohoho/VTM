import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';
import { EnumPath } from '@/utils/Enums';

interface EmailSuccessComponentProps {
  handleResetView?: () => void;
  handleNavigate: (url: string) => void;
}

const EmailSuccessComponent: FunctionComponent<EmailSuccessComponentProps> = props => {
  const { handleNavigate } = props;
  return (
    <>
      <ButtonRoot
        type='button'
        onClick={() => {
          handleNavigate(EnumPath.HOME);
        }}>
        <Localize tid={'account.forgotConfirm'} />
      </ButtonRoot>
    </>
  );
};

export default EmailSuccessComponent;
