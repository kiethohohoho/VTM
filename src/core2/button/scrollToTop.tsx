import { Button } from '@progress/kendo-react-buttons';
import { useEffect } from 'react';

import { useBoolean } from '@/hooks/useBoolean';

function ScrollToTopButton() {
  const { value: showButton, setValue: setShowButton } = useBoolean(false);

  useEffect(() => {
    // Add event listener to handle scroll and show/hide button
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const showButtonThreshold = 200; // Adjust this threshold to control when the button appears
      setShowButton(scrollTop > showButtonThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Remove event listener when the component is unmounted
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
            borderRadius: '100%',
          }}>
          <Button
            onClick={handleScrollToTop}
            style={{ borderRadius: '100%', paddingBlock: 8, background: '#fff' }}>
            <span
              style={{ width: 35, height: 35, color: '#ff6358' }}
              className='k-icon k-i-sort-asc-sm k-icon-xl'></span>
          </Button>
        </div>
      )}
    </>
  );
}

export default ScrollToTopButton;
