import { type ReactNode, useEffect } from 'react';
export interface ScreenLoaderProps {
  smallRoundBorderColor?: string;
  bigRoundBorderColor?: string;
  main?: boolean;
}

const RootStyle = ({ children, main }: { children: ReactNode; main: boolean }) => (
  <div
    className='bg-primary-bg-color'
    style={{
      right: 0,
      bottom: 0,
      zIndex: 100,
      width: main ? 'calc(100% - 260px)' : '100%',
      height: main ? 'calc(100% - 80px)' : '100%',
      position: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    {children}
  </div>
);

const ScreenLoader = ({ smallRoundBorderColor, bigRoundBorderColor, main = false }: ScreenLoaderProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <RootStyle main={main}>
      <div
        className='relative logo'
        style={{ height: 40, width: 100, transform: 'translate(-100%, 50%)' }}>
        <h2>VTM</h2>
        <h2>VTM</h2>
      </div>
      <div
        style={{
          width: 280,
          height: 280,
          borderRadius: '25%',
          position: 'absolute',
          border: `solid 8px ${smallRoundBorderColor || '#77abf3'}`,
          animation: 'smallPulse 3.2s linear infinite',
        }}
      />

      <div
        style={{
          width: 300,
          height: 300,
          borderRadius: '25%',
          position: 'absolute',
          border: `solid 8px ${bigRoundBorderColor || '#77abf3'}`,
          animation: 'bigPulse 3.2s linear infinite',
        }}
      />
    </RootStyle>
  );
};

export default ScreenLoader;
