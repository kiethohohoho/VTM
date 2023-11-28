import React from 'react';
import { useNavigate } from 'react-router-dom';

import { styleSecondaryButton } from '@/featureVTM/type';

import { ButtonRootAntD } from '../button';

interface BackButtonProps {
  className?: string;
  style?: React.CSSProperties;
  content?: string;
  onClick?: () => void;
  redirect?: any;
}

const BackButton: React.FC<BackButtonProps> = ({ redirect, content, style, ...props }) => {
  const navigate = useNavigate();

  if (redirect) {
    return (
      <ButtonRootAntD
        style={{ ...styleSecondaryButton, ...style }}
        onClick={() => {
          navigate(redirect);
        }}>
        &lt; {content || 'Quay lại'}
      </ButtonRootAntD>
    );
  }
  return (
    <ButtonRootAntD
      style={{ ...styleSecondaryButton, ...style }}
      onClick={() => {
        navigate(-1);
      }}>
      &lt; {content || 'Quay lại'}
    </ButtonRootAntD>
  );
};

export default BackButton;
