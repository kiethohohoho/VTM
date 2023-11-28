import Cookies, { type CookieSetOptions } from 'universal-cookie';

import Config from '@/Config';

import { LoggerService } from './Logger';

export interface IProfile {
  cusName: string;
  status: number;
  [property: string]: any;
}
export interface IAuth {
  token: string;
  expireAt: number;
  refreshAt: number;
  profileDetails: IProfile;
}
class AuthService {
  private static instance: AuthService;
  private static readonly cookie: any = new Cookies();
  private static readonly config: any = new Config().getState();
  private static readonly options: CookieSetOptions = {
    secure: true,
    sameSite: 'strict',
    httpOnly: false,
  };

  public static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  static setPackageAuth(auth: IAuth, expireAt: number) {
    this.cookie.set(this.config.cookie.auth, auth, {
      expires: new Date(expireAt),
      ...this.options,
    });
  }

  static setPackageProfile(profile: IProfile, expireAt: number) {
    this.cookie.set(this.config.cookie.profile, profile, {
      expires: new Date(expireAt),
      ...this.options,
    });
  }

  static setPackageExpireAt(expireAt: number) {
    this.cookie.set(this.config.cookie.expireAt, expireAt, {
      expires: new Date(expireAt),
      ...this.options,
    });
  }

  static setActionAuth(action: IAuth, expireAt: number) {
    this.cookie.set(this.config.cookie.action, action, {
      expires: new Date(expireAt),
      ...this.options,
    });
  }

  static getActionAuth() {
    return this.cookie.get(this.config.cookie.action);
  }

  static getPackageAuth() {
    return this.cookie.get(this.config.cookie.auth);
  }

  static getPackageProfile() {
    return this.cookie.get(this.config.cookie.profile);
  }

  static getPackageExpiredAt() {
    return this.cookie.get(this.config.cookie.expireAt);
  }

  static removePackageAuth() {
    try {
      LoggerService.info('AuthService execute removePackageAuth');

      return this.cookie.remove(this.config.cookie.auth);
    } catch (error: any) {
      LoggerService.error('AuthService execute removePackageAuth', error.toString());
    }
  }

  static removePackageProfile() {
    return this.cookie.remove(this.config.cookie.profile);
  }

  static removePackageExpiredAt() {
    return this.cookie.remove(this.config.cookie.expireAt);
  }

  static removeAll() {
    try {
      LoggerService.info('AuthService execute removeAll');

      this.removePackageAuth();
      this.removePackageProfile();
      this.removePackageExpiredAt();
    } catch (error: any) {
      LoggerService.error('AuthService execute removeAll', error.toString());
    }
  }

  static setAllPackage(auth: IAuth, profile: any) {
    try {
      LoggerService.info('AuthService execute setAllPackage');
      AuthService.setPackageAuth(auth, auth.expireAt);
      AuthService.setPackageProfile(profile, auth.expireAt);
      AuthService.setPackageExpireAt(auth.expireAt);
    } catch (error: any) {
      LoggerService.error('AuthService execute setAllPackage', error);
    }
  }

  static handleLogout() {
    try {
      LoggerService.info('AuthService execute handleLogout');

      AuthService.removeAll();
    } catch (error: any) {
      LoggerService.error('AuthService execute handleLogout', error.toString());
    }
  }

  static getPushKey() {
    try {
      LoggerService.info('AuthService execute getPushKey');
      const cookies = new Cookies();
      const pushKey = cookies.get(this.config.cookies.pushKey);
      return pushKey;
    } catch (e: any) {
      LoggerService.error(`AuthService execute getPushKey error`, e.toString());
    }
  }

  static setPushKey(pushKey: any) {
    try {
      LoggerService.info(`AuthService execute setPushKey`);
      const cookies = new Cookies();
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 5);
      cookies.set('pushKey', pushKey, { expires: new Date(tomorrow.getTime()) });
    } catch (e: any) {
      LoggerService.error(`AuthService execute setPushKey`, e.toString());
      throw e;
    }
  }

  static getDeviceKey() {
    try {
      LoggerService.info('AuthService execute getDeviceKey');
      const cookies = new Cookies();
      const deviceKey = cookies.get(this.config.cookies.deviceKey);
      return deviceKey;
    } catch (e: any) {
      LoggerService.error(`AuthService execute getDeviceKey error`, e.toString());
    }
  }
}

export default AuthService;
