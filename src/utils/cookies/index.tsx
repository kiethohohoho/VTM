import Cookies from 'universal-cookie';

import { Helper } from '../Helper';
import { LoggerService } from '../Logger';
import { roughSizeOfObject } from './count';

class CookiesService {
  static set(key: any, data: any, expiredAt: any) {
    try {
      LoggerService.info('CookiesService execute set');
      // Logger.debug('CookiesService execute set receive key', key)
      // Logger.debug('CookiesService execute set receive data', data)
      // Logger.debug('CookiesService execute set receive expiredAt', expiredAt)
      const cookies = new Cookies();
      data = JSON.stringify(data);
      data = Helper.encodeBase64(data);
      // data = Helper.encodeBase64(data)
      const bytes = roughSizeOfObject(data);
      // Logger.debug('CookiesService execute set receive bytes', bytes)
      if (bytes > 4096) throw new Error(`out of size to save to cookies ${bytes} maximum 4096 bytes`);
      cookies.set(Helper.hashMD5(key), data, { expires: expiredAt, path: '/' });
    } catch (e: any) {
      LoggerService.error('CookiesService execute set', e);
      throw e;
    }
  }

  static get(key: any) {
    try {
      LoggerService.info('CookiesService execute get');
      // Logger.debug('CookiesService execute get receive key', key)
      const cookies = new Cookies();
      let data = cookies.get(Helper.hashMD5(key));
      if (data) {
        // data = Helper.decodeBase64(data)
        data = Helper.decodeBase64(data);
        data = JSON.parse(data);
        return data;
      }
      return null;
    } catch (e: any) {
      LoggerService.error(`CookiesService execute get`, e.toString());
      throw e;
    }
  }

  static remove(key: any) {
    try {
      LoggerService.info('CookiesService execute remove');
      // Logger.debug('CookiesService execute remove receive key', key)
      const cookies = new Cookies();
      cookies.remove(Helper.hashMD5(key), { path: '/' });
    } catch (e: any) {
      LoggerService.error(`CookiesService execute remove`, e);
      throw e;
    }
  }
}

export default CookiesService;
