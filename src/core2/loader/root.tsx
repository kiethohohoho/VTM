interface LoaderRootProps {
  style?: React.CSSProperties;
}

const LoaderRoot = ({ style }: LoaderRootProps) => {
  return (
    <div
      className='loader-default'
      style={{
        width: '100%',
        flexGrow: 1,
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        ...style,
      }}>
      <div className='linear-activity'>
        <div className='indeterminate'></div>
      </div>
    </div>
  );
};

export default LoaderRoot;
