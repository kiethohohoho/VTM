import { ButtonRootAntD } from '@/coreVTM/button';

import { stylePrimaryButton } from '../type';

interface LogoutButtonProps {
  onLogout?: () => void;
  content?: string;
}

const LogoutView: React.FC<LogoutButtonProps> = ({ content, onLogout, ...props }) => {
  return (
    <ButtonRootAntD
      style={stylePrimaryButton}
      onClick={onLogout}
      content={content}
      {...props}
    />
  );
};

export default LogoutView;
