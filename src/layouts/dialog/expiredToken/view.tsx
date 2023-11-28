import { useContext } from 'react';

import expired from '@/assets/images/expired/expired.png';
import { ContextModal } from '@/context/dialog';
import { ButtonRoot } from '@/core2/button';

function View() {
  const { onSubmit, onShowModal } = useContext(ContextModal);
  return (
    <div className='flex flex-column items-center gap-3 p-5'>
      <img
        className='w-60'
        src={expired}
      />
      <div className='3xl extraBold'>Login session has expired</div>
      <div className='base secondary w-96 align-center'>Please login again!</div>
      <ButtonRoot
        onClick={() => {
          onSubmit && onSubmit();
          onShowModal();
        }}
        rounded='full'>
        Login
      </ButtonRoot>
    </div>
  );
}

export default View;
