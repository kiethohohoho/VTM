import { Button } from 'antd';
import { useEffect } from 'react';

import { useBoolean } from '@/hooks/useBoolean';

function ScrollToTopButtonAntd() {
  const { value: showButton, setValue: setShowButton } = useBoolean(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const showButtonThreshold = 200;
      setShowButton(scrollTop > showButtonThreshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      {showButton && (
        <div
          style={{
            position: 'fixed',
            bottom: 70,
            right: 30,
            zIndex: 9999,
          }}>
          <Button
            onClick={handleScrollToTop}
            shape='circle'>
            <span
              style={{ width: 35, height: 35, color: '#ff6358' }}
              className='k-icon k-i-sort-asc-sm k-icon-xl'></span>
          </Button>
        </div>
      )}
    </>
  );
}

export default ScrollToTopButtonAntd;
