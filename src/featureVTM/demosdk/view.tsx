import { useState } from 'react';

import { ButtonRootAntD } from '@/coreVTM/button';

import createSocketID from '../kyc/login/loginForm/socket';
import {
  cancelDeposit,
  type cancelDepositCommand,
  checkMoney,
  type checkMoneyProps,
  closeShutter,
  type closeShutterProps,
  type CountCommand,
  countMoney,
  createNewSession,
  type CreateSessionInput,
  deposit,
  type depositProps,
  endSession,
  type EndsessionInput,
  openShutter,
  type openShutterProps,
  preparedeposit,
  type prepareDepositCommand,
  thermalPrint,
  type thermalPrintProps,
  withDraw,
  type withDrawProps,
} from '../withdraw';
const DemoSdkPage = () => {
  console.log('Start loading demoSDK page ....');
  const sessionid = createSocketID();
  const [createSession, setCreateSession] = useState<any>('');
  const [endTheSession, setEndTheSession] = useState<any>('');
  const [createOpenShutter, setCreateOpenShutter] = useState<any>('');
  const [shutterClose, setShutterClose] = useState<any>('');
  const [drawMoney, setDrawMoney] = useState<any>('');
  const [checkTheMoney, setCheckTheMoney] = useState<any>('');
  const [readyCountMoney, setReadyCountMoney] = useState<any>('');
  const [depositMoney, setDepositMoney] = useState<any>('');
  const [readyDeposit, setReadydeposit] = useState<any>('');
  const handleCreateNewSession = (sessionid: string | number, noteSomething: string) => {
    const inputCreateSession: CreateSessionInput = {
      command: 'createsession',
      sessionId: sessionid,
      note: noteSomething,
      revokedest: ['A', 'B', 'C'],
    };
    // STVTM.createNewSession(inputCreateSession);
    const result = createNewSession(inputCreateSession);
    try {
      setCreateSession(result);
      console.log('handleCreateNewSession', result);
    } catch (error) {
      console.log('handleCreateNewSession is error');
    }
  };
  const handleEndSession = (notesomething: string) => {
    const inputEndSession: EndsessionInput = {
      command: 'endsession',
      note: notesomething,
    };
    try {
      const result = endSession(inputEndSession);
      console.log('handleEndSession', result);
      setEndTheSession(result);
    } catch (error) {
      console.log('handleEndSession is error', error);
    }
  };
  const handleOpenShutter = (notesomething: string) => {
    const inputOpenShutter: openShutterProps = {
      command: 'openshutter',
      note: notesomething,
    };
    try {
      const result = openShutter(inputOpenShutter);
      setCreateOpenShutter(result);
      console.log('handleOpenShutter', result);
    } catch (error) {
      console.log('handleOpenShutter is error', error);
    }
  };
  const handleCloseShutter = (notesomething: string) => {
    const inputCloseShutter: closeShutterProps = {
      command: 'closeshutter',
      note: notesomething,
    };
    try {
      const result = closeShutter(inputCloseShutter);
      setShutterClose(result);
      console.log('handleCloseShutter', result);
    } catch (error) {
      console.log('handleCloseShutter is error', error);
    }
  };
  const handleWithDraw = (amountMonny: number) => {
    const inputAmountMoney: withDrawProps = {
      command: 'withdraw',
      amount: amountMonny,
    };
    try {
      const result = withDraw(inputAmountMoney);
      setDrawMoney(result);
      console.log('handleWithDraw', result);
    } catch (error) {
      console.log('handleWithDraw is error', error);
    }
  };
  const handleCheckMoney = (MoneyToCheck: number) => {
    const inputMoneyToCheck: checkMoneyProps = {
      command: 'check',
      amount: MoneyToCheck,
    };
    try {
      const result = checkMoney(inputMoneyToCheck);
      setCheckTheMoney(result);
      console.log('handleCheckMoney', result);
    } catch (error) {
      console.log('handleCheckMoney is error');
    }
  };
  const handleCountMoney = (openShutterOnReject: boolean) => {
    const inputMoneyToCount: CountCommand = {
      command: 'count',
      option: {
        OpenShutterOnReject: openShutterOnReject || true,
      },
    };
    try {
      const result = countMoney(inputMoneyToCount);
      setReadyCountMoney(result);
      console.log('handleCountMoney', result);
    } catch (error) {
      console.log('handleCountMoney is error', error);
    }
  };
  const handlePrepareDeposit = () => {
    const inputPrepare: prepareDepositCommand = {
      command: 'preparedeposit',
    };
    try {
      const result = preparedeposit(inputPrepare);
      setReadydeposit(result);
      console.log('handlePrepareDeposit', result);
    } catch (error) {
      console.log('handlePrepareDeposit is error', error);
    }
  };
  const handleDeposit = () => {
    const inputDeposit: depositProps = {
      command: 'deposit',
    };
    try {
      const result = deposit(inputDeposit);
      setDepositMoney(result);
      console.log('handleDeposit', result);
    } catch (error) {
      console.log('handleDeposit is error', error);
    }
  };
  const handleCancelDeposit = () => {
    const inputCancelDeposit: cancelDepositCommand = {
      command: 'canceldeposit',
    };
    cancelDeposit(inputCancelDeposit);
  };
  const handlePrintBill = (contentToPrint: string) => {
    const inputContentToPrint: thermalPrintProps = {
      command: 'thermalprint',
      content: contentToPrint,
    };
    thermalPrint(inputContentToPrint);
  };
  return (
    <div style={{ paddingBottom: 300, paddingLeft: 120, paddingRight: 30 }}>
      <div>
        <h1>Create new session</h1>
        <ButtonRootAntD
          onClick={() => {
            handleCreateNewSession(sessionid, '123131');
          }}>
          Create new session
        </ButtonRootAntD>
        <div>Result: {JSON.stringify(createSession)}</div>
      </div>
      <div>
        <h1>End session </h1>
        <ButtonRootAntD
          onClick={() => {
            handleEndSession('123131');
          }}>
          End session
        </ButtonRootAntD>
        <div>Result: {JSON.stringify(endTheSession)}</div>
      </div>
      <div>
        <h1>Open shutter </h1>
        <ButtonRootAntD
          onClick={() => {
            handleOpenShutter('Open shuter');
          }}>
          Open shutter
        </ButtonRootAntD>
        <div>Result: {JSON.stringify(createOpenShutter)}</div>
      </div>
      <div>
        <h1>Close shutter </h1>
        <ButtonRootAntD
          onClick={() => {
            handleCloseShutter('123131');
          }}>
          Close shutter
        </ButtonRootAntD>
        <div>Result: {JSON.stringify(shutterClose)}</div>
      </div>
      <div>
        <h1>WithDraw Money </h1>
        <ButtonRootAntD
          onClick={() => {
            handleWithDraw(30000);
          }}>
          WithDraw
        </ButtonRootAntD>
        <div>Result: {JSON.stringify(drawMoney)}</div>
      </div>
      <div>
        <h1>Check Money </h1>
        <ButtonRootAntD
          onClick={() => {
            handleCheckMoney(20000);
          }}>
          checkMoney
        </ButtonRootAntD>
        <div>Result: {JSON.stringify(checkTheMoney)}</div>
      </div>
      <div>
        <h1>Count Money </h1>
        <ButtonRootAntD
          onClick={() => {
            handleCountMoney(true);
          }}>
          Count Money
        </ButtonRootAntD>
        <div>Result: {JSON.stringify(readyCountMoney)}</div>
      </div>
      <div>
        <h1>Preparedeposit </h1>
        <ButtonRootAntD onClick={handlePrepareDeposit}>preparedeposit</ButtonRootAntD>
        <div>Result: {JSON.stringify(readyDeposit)}</div>
      </div>
      <div>
        <h1>Deposit </h1>
        <ButtonRootAntD onClick={handleDeposit}>Deposit</ButtonRootAntD>
        <div>Result: {JSON.stringify(depositMoney)}</div>
      </div>
      <div>
        <h1>Cancel Deposit </h1>
        <ButtonRootAntD onClick={handleCancelDeposit}>Cancel Deposit</ButtonRootAntD>
      </div>
      <div>
        <h1>Print Bill </h1>
        <ButtonRootAntD
          onClick={() => {
            handlePrintBill('Chuyển khoảng');
          }}>
          Print Bill
        </ButtonRootAntD>
      </div>
      {/* <div>
        <h1>Get info VTM </h1>
        <ButtonRootAntD
          onClick={() => {
            handlePrintBill('Chuyển khoảng');
          }}>
          Print Bill
        </ButtonRootAntD>
      </div> */}
    </div>
  );
};

export default DemoSdkPage;
