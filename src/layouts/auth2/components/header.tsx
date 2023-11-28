import { useNavigate } from 'react-router-dom';

import iconCaretDown from '@/assets/images/icon/caretDown.svg';
import iconHome from '@/assets/images/icon/home.svg';
import { EnumPath } from '@/utils/Enums';

const LayoutAuthHeader = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-center items-center gap-14'>
      <div>Help</div>
      <div>Contact us</div>
      <div className='flex gap-2 items-center'>
        <span>English </span>
        <img
          src={iconCaretDown}
          alt='icon'
        />
      </div>
      <div
        onClick={() => {
          navigate(EnumPath.REGISTER);
        }}
        className='cursor-pointer'>
        Register
      </div>
      <div className='flex items-center'>
        <img
          src={iconHome}
          alt='icon'
        />
      </div>
    </div>
  );
};

export default LayoutAuthHeader;
