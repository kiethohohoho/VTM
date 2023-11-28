import NewPasswordComponent from '../forgotPassword/layout/newPassword';
import { type ResetPasswordViewProps } from './types';

const View = (props: ResetPasswordViewProps) => {
  const { handleSubmit, handleRedirectLogin, loading } = props;
  return (
    <NewPasswordComponent
      handleSubmitNewPassword={handleSubmit}
      handleNavigate={handleRedirectLogin}
      loading={loading}
    />
  );
};
export default View;
