import { type FunctionComponent } from 'react';

import { Localize } from '@/context/languages';
import { ButtonRoot } from '@/core2/button';

interface EmailErrorComponentProps {
  viewData?: any;
  handleResetView: () => void;
  handleNavigate?: (url: string) => void;
}

const EmailErrorComponent: FunctionComponent<EmailErrorComponentProps> = props => {
  const { handleResetView } = props;

  return (
    <>
      <ButtonRoot
        type='button'
        onClick={handleResetView}>
        <Localize tid={'account.forgotConfirm'} />
      </ButtonRoot>
    </>
  );
};

export default EmailErrorComponent;
