import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

const createSocketID = () => {
  LoggerService.info('createSocketID');

  const nowTime = new Date().getTime();
  //   const hash = Helper.hashMD5(`${Helper.generateOnly()} + ${nowTime}`);
  const socketName = `WEB-USER(${Helper.hashMD5(`${nowTime}${nowTime}`)})WEB-USER`;
  //   const sign = Helper.hashSHA256(`${socketName}e6c20ecaeea12da7026972d6452f88b6`);
  const socketID = JSON.stringify(
    socketName,
    // sign,
  );

  LoggerService.debug('SOCKET ID', socketID);
  return socketID;
};

export const createChecking = () => {
  LoggerService.info('createSocketID');

  const nowTime = new Date().getTime();
  //   const hash = Helper.hashMD5(`${Helper.generateOnly()} + ${nowTime}`);
  const Checking = `${Helper.hashMD5(`${nowTime}${nowTime}`)}`;
  //   const sign = Helper.hashSHA256(`${socketName}e6c20ecaeea12da7026972d6452f88b6`);
  const CheckingID = JSON.stringify(Checking);

  return CheckingID;
};

export default createSocketID;
