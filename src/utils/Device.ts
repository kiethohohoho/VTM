import { browserName, browserVersion, osName, osVersion } from 'react-device-detect';
import UAParser from 'ua-parser-js';
import Cookies from 'universal-cookie';

import Config from '@/Config';

import { Helper } from './Helper';
import { LoggerService } from './Logger';
export interface IDevicePayload {
  deviceProducer: string;
  deviceModel: string;
  deviceName: string;
  deviceDisplayName: string;
  deviceType: string;
  pushKey: string;
  platformOS: string;
  versionOS: string;
  applicationVersion: string;
  deviceKey: string | undefined;
}
class DeviceService {
  private static instance: DeviceService;
  private static readonly cookie: any = new Cookies();
  private static readonly config: any = new Config().getState();
  public static getInstance() {
    if (!DeviceService.instance) {
      DeviceService.instance = new DeviceService();
    }
    return DeviceService.instance;
  }

  static getPushKey() {
    try {
      LoggerService.info('DeviceService execute getPushKey');
      const pushKey = this.cookie.get(this.config.pushKey);
      return pushKey;
    } catch (e: any) {
      LoggerService.error(`DeviceService execute getPushKey error`, e.toString());
    }
  }

  static setPushKey(pushKey: any) {
    try {
      LoggerService.info(`DeviceService execute setPushKey`);

      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 5);
      this.cookie.set(this.config.pushKey, pushKey, { expires: new Date(tomorrow.getTime()) });
    } catch (e: any) {
      LoggerService.error(`DeviceService execute setPushKey`, e.toString());
      throw e;
    }
  }

  static getDeviceInfo = () => {
    const parser = new UAParser();
    const browser = parser?.getResult().browser;
    const device = {
      browerName: parser.getResult().browser.name,
      browerVersion: browser?.version,
      osName: parser.getResult().os.name,
      osVersion: parser.getResult().os.version,
    };
    return encodeURIComponent(
      `${device.osName}:${device.osVersion}:${device.browerName}:${device?.browerVersion?.slice(0, 2)}:Unknown`,
    );
  };

  static getDeviceKey() {
    try {
      LoggerService.info('DeviceService execute getDeviceKey');
      let deviceKey = '';
      if (!Helper.isEmpty(this.cookie.get(this.config.deviceKey))) {
        deviceKey = this.cookie.get(this.config.deviceKey) as string;
      } else {
        deviceKey = Helper.randomKey();
        this.cookie.set(this.config.deviceKey, deviceKey);
      }
      return deviceKey;
    } catch (e: any) {
      LoggerService.error(`DeviceService execute getDeviceKey error`, e.toString());
    }
  }

  static getDevice() {
    try {
      LoggerService.info('DeviceService execute getDevice');
      const device: IDevicePayload = {
        deviceProducer: browserName,
        deviceModel: osVersion,
        deviceName: browserName,
        deviceDisplayName: `${browserName} ${browserVersion}`,
        deviceType: this.config.deviceType,
        pushKey: this.cookie.get(this.config.pushKey),
        platformOS: osName,
        versionOS: browserVersion,
        applicationVersion: APP_VERSION,
        deviceKey: this.getDeviceKey(),
      };
      return device;
    } catch (e: any) {
      LoggerService.error(`DeviceService execute getDeviceKey error`, e.toString());
    }
  }
}

export default DeviceService;
