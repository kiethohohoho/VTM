import './_index.scss';

import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import notFound from '@/assets/images/404/404.png';
import { EnumPath } from '@/utils/Enums';

const Notfound: FC = () => {
  /* hook */
  const navigate = useNavigate();

  /* render */
  return (
    <div
      style={{
        gap: '40px',
      }}
      className='ls-w_full ls-flex ls-flex-col ls-items_center ls-404-height ls-justify_center'>
      <div
        style={{
          gap: '72px',
        }}
        className='ls-flex ls-404-fs'>
        <div>4</div>
        <div className='ls-relative'>
          <div className='ls-404-container'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div>4</div>
      </div>
      <div className='ls-404-note ls-flex ls-flex-col ls-gap_1'>
        <div>SORRY, PAGE NOT FOUND</div>
        <div
          onClick={() => {
            navigate(EnumPath.HOME);
          }}
          style={{
            textAlign: 'center',
          }}
          className='ls-text_base ls-text_purple-400 ls-cursor_pointer'>
          GO TO DASHBOARD
        </div>
      </div>
      <div>
        <img
          className='ls-404-imgError'
          src={notFound}
          alt='not fount'
        />
      </div>
    </div>
  );
};
export default Notfound;
