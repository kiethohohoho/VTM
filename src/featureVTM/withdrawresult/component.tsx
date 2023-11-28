import ResultView from './view';

const WithDrawResultComponent = () => {
  return (
    <ResultView
      title='Giao dịch thành công'
      pageRedirect='withDraw'
      buttonContent='Giao dịch mới'
    />
  );
};

export default WithDrawResultComponent;
