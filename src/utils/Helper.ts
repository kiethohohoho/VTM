import * as bcrypt from 'bcryptjs';
import Crypto, { MD5 } from 'crypto-js';
import dayjs from 'dayjs';
import Jsencrypt from 'jsencrypt';
import { v4 as uuuid } from 'uuid';

import Config from '@/Config';
import { type ImageSize } from '@/core2/common/type';

declare global {
  interface Window {
    opera: any;
    MSStream: any;
  }
}
export class Helper {
  static generateCookies(): string | undefined {
    throw new Error('Method not implemented.');
  }
  // constructor () {}

  static randomKey(): string {
    return uuuid();
  }

  static hashSHA256(data: any): string {
    const hash = Crypto.SHA256(data).toString();

    return hash;
  }

  static randomMathFloor() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  static generateOnly() {
    return (
      this.randomMathFloor() +
      this.randomMathFloor() +
      '-' +
      this.randomMathFloor() +
      '-' +
      this.randomMathFloor() +
      '-' +
      this.randomMathFloor() +
      '-' +
      this.randomMathFloor() +
      this.randomMathFloor() +
      this.randomMathFloor()
    );
  }

  static getSocketIDCache() {
    // this.LoggerService.info('SocketDataService', 'getSocketIDCache');
    const cache = this.getDataCache('af9773e8839321519630b829f861cb2f');
    return cache != null ? cache.socketID : null;
  }

  static getDataCache(key: any) {
    const data = sessionStorage.getItem(Helper.encode(key));
    // console.log((this.HelperService.isNullOrEmpty(data)) ? null : JSON.parse(this.HelperService.decode(data)))
    return Helper.isNullOrEmpty(data) ? null : JSON.parse(Helper.decode(data));
  }

  static getData(code: any) {
    // const socketResponse = new Map([]);
    // return socketResponse.has(code) ? socketResponse.get(code) : null;
    const cache = Helper.getSocketIDCache();
    if (Helper.isNullOrEmpty(cache)) return null;
    const data = new Map(cache.data);
    console.log('data', data.get(code));
    return data.has(code) ? data.get(code) : null;
  }

  static encode(str: any) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        return String.fromCharCode(parseInt('0x' + p1));
      }),
    );
  }

  static isNullOrEmpty(string: any) {
    return string === '' || string === null || string === undefined;
  }

  static decode(str: any) {
    return decodeURIComponent(
      atob(str)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
  }

  static hashRSA(data: any): string {
    const config = new Config().getState();
    const key = config.cookie.rsaKey;
    const jsencrypt = new Jsencrypt();

    jsencrypt.setPublicKey(key);
    const encryption = jsencrypt.encrypt(data).toString();

    return encryption;
  }

  static async hashBcrypt(data: any): Promise<string> {
    const config = new Config().getState();
    const { alg, cost, salt } = config.password;
    const genSalt = `${alg}${cost}$${salt}`;
    return await bcrypt.hash(data, genSalt).then(hash => {
      return hash;
    });
  }

  static async hashPassword(data: any): Promise<string> {
    const hash = this.hashRSA(await this.hashBcrypt(data));

    return hash;
  }

  static async hashPasswordMD5(data: any): Promise<string> {
    const hash = this.hashRSA(await Promise.resolve(this.hashMD5(data)));
    return hash;
  }

  static getBrowserId = () => {
    const userAgent = navigator.userAgent || 'no-user-agent';
    const hashedBrowserId = Helper.hashSHA256(userAgent).toString();
    return hashedBrowserId;
  };

  static isEmpty(value: any): boolean {
    if (typeof value === 'string') {
      return value.trim() === '';
    }

    return (
      typeof value === 'undefined' ||
      value === null ||
      (Object.keys(value).length === 0 && Object.getPrototypeOf(value) === Object.prototype) ||
      (value instanceof Array && value.length === 0)
    );
  }

  static exactTypeOf(variable: any): string {
    return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
  }

  static isNullOrUndefined(variable: any): boolean {
    return Helper.exactTypeOf(variable) === 'null' || Helper.exactTypeOf(variable) === 'undefined';
  }

  static removeObjectEmpty(obj: any): any {
    Object.keys(obj).forEach(key => {
      if (Helper.isEmpty(obj[key])) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete obj[key];
      }
    });
    return obj;
  }

  static equalTwoNumber(number1: number, number2: number) {
    return number1 === number2;
  }

  static getRatio(ratio: string = '1/1') {
    return {
      '4/3': 'calc(100% / 4 * 3)',
      '3/4': 'calc(100% / 3 * 4)',
      '6/4': 'calc(100% / 6 * 4)',
      '4/6': 'calc(100% / 4 * 6)',
      '16/9': 'calc(100% / 16 * 9)',
      '9/16': 'calc(100% / 9 * 16)',
      '21/9': 'calc(100% / 21 * 9)',
      '9/21': 'calc(100% / 9 * 21)',
      '1/1': '100%',
    }[ratio];
  }

  static getImageSize(size: ImageSize = 'medium') {
    return {
      smallest: 50,
      small: 100,
      medium: 200,
      large: 400,
      larger: 600,
      largest: 800,
    }[size];
  }

  static createObjectURL(item: File) {
    return URL.createObjectURL(item);
  }

  static revokeObjectURL(item: string) {
    URL.revokeObjectURL(item);
  }

  static isString(string: any) {
    return typeof string === 'string';
  }

  static isArray(array: any) {
    return typeof array === 'object';
  }

  static equalTwoString(string1: string, string2: string): boolean {
    return string1 === string2;
  }

  static isEmail(email: string) {
    const regex = new RegExp(/^[a-z0-9]+@[a-z]+\.[a-z]{2,5}$/g);
    return regex.test(email.toLowerCase());
  }

  static isPhone(phone: string | number) {
    if (typeof phone === 'number') {
      phone = phone.toString();
    }
    if (phone.at(0) === '0') {
      const accepts = ['3', '5', '7', '8', '9'];
      if (!accepts.includes(phone.at(1) as string)) {
        return false;
      }
    }

    const regex = new RegExp(/^(84|855|1|0)+?[1-9]\d{7,14}$/g);
    return regex.test(phone.toLowerCase());
  }

  static dateTimeToMilliseconds(date: any) {
    return dayjs(date).unix() * 1000;
  }

  static convertToDate(milliseconds: number) {
    const date = new Date(milliseconds);
    return date;
  }

  static convertToHourMinusSecond(milliseconds: number) {
    const hours = dayjs(milliseconds).get('hours');
    const minus = dayjs(milliseconds).get('minute');
    if (hours > 12) {
      if (minus > 9) {
        return `${hours - 12}:${minus} PM`;
      }
      return `${hours - 12}:0${minus} PM`;
    }
    if (minus > 9) {
      return `${hours}:${minus} AM`;
    }
    return `${hours}:0${minus} AM`;
  }

  static formatDateFull(time: number): string {
    return dayjs(time).format('DD-MM-YYYY HH:mm:ss');
  }

  static formatDate(time: number): string {
    return dayjs(time).format('DD-MM-YYYY');
  }

  static generalSrcImage(src: string) {
    const config = new Config().getState();
    return `${config.api.static.host}${src}`;
  }

  static parseImage(strings: string) {
    const replaceString = strings.replace('[', '').replace(']', '');
    return replaceString.split(',');
  }

  static convertObjectToArray(array: File[]) {
    return array.map((item, index) => {
      return {
        id: index,
        file: item,
      };
    });
  }

  static convertObjectToArrayMulti(array: File[], length: number) {
    return array.map((item, index) => {
      return {
        id: length + index,
        file: item,
      };
    });
  }

  static createObjectURLForImages(array: Array<{ id: number; file: File }>) {
    return array.map((item, index) => {
      return {
        id: item.id,
        src: Helper.createObjectURL(item.file),
      };
    });
  }

  static createObjectForImagesDefault(array: string[]) {
    return array.map((item: string, index: any) => {
      return {
        id: index,
        src: Helper.generalSrcImage(item),
      };
    });
  }

  static createObjectForImagesDefaultNotGeneralSrcImage(array: string[]) {
    return array.map((item: string, index: any) => {
      return {
        id: index,
        src: item,
      };
    });
  }

  static returnImagesDefault(array1: Array<{ id: number; src: string }>, array2: Array<{ id: number; src: string }>) {
    return array1.filter(itemCreateBaseURL => array2.find(itemDefault => itemDefault.id === itemCreateBaseURL.id));
  }

  static formatCurrency(amount: any) {
    const formatter = new Intl.NumberFormat('en-US', {
      maximumSignificantDigits: 2,
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(amount);
  }

  static getDataForTakePage(take: number, form: number, data: any[]): any[] {
    return data.filter((item, index) => {
      const condition =
        Helper.equalNumberAndConditionNumber(index + 1, form * take) &&
        !Helper.equalNumberAndConditionNumber(index + 1, form * take + take);
      return condition;
    });
  }

  static equalNumberAndConditionNumber(number: number, conditionNumber: number) {
    if (number > conditionNumber) {
      return true;
    }
    return false;
  }

  static equalTwoIdCategory(id1: string, id2: string) {
    if (id1 === id2) {
      return true;
    }
    return false;
  }

  static equalLengthArrayAndIndex(index: number, array: any[]) {
    if (index === array.length - 1) {
      return true;
    }
    return false;
  }

  static isArrayEmpty(array: any[]) {
    if (array.length === 0) {
      return true;
    }
    return false;
  }

  static encodeBase64(string: string): string {
    return btoa(
      encodeURIComponent(string).replace(/%([0-9A-F]{2})/g, (match, p1: number) => {
        return String.fromCharCode(0 + p1);
      }),
    );
  }

  static hashMD5(string = '') {
    // return CryptoJS.MD5(string).toString();
    return MD5(string).toString();
  }

  static decodeBase64(string: string): string {
    return decodeURIComponent(
      atob(string)
        .split('')
        .map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
  }

  static getMobileOperatingSystem = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    // if (/windows phone/i.test(userAgent)) {
    //   return "Windows Phone";
    // }

    if (/android/i.test(userAgent)) {
      return 'Android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'IOS';
    }

    return 'unknown';
  };

  static isJson = (val: any) => {
    try {
      JSON.parse(val);
      return true;
    } catch (e) {
      return false;
    }
  };

  static equalLessThenZero(number: number) {
    if (number < 0) {
      return true;
    }
    return false;
  }

  static dateTimeToMillisecondsKhmer(cambodianDate: any): number {
    // Create a mapping from Cambodian numerals to Arabic numerals
    const cambodianToArabicMap: any = {
      '០': '0',
      '១': '1',
      '២': '2',
      '៣': '3',
      '៤': '4',
      '៥': '5',
      '៦': '6',
      '៧': '7',
      '៨': '8',
      '៩': '9',
    };

    // Replace Cambodian numerals with Arabic numerals
    const arabicDate = cambodianDate.replace(/[០-៩]/g, (match: any) => cambodianToArabicMap[match]);

    // Split the date string by '-' to get day, month, and year
    const dateParts = arabicDate.split('.');
    if (dateParts.length !== 3) {
      return 0; // Invalid date format
    }

    const [day, month, year] = dateParts;

    // Create a JavaScript Date object using the converted values
    const jsDate = new Date(`${year}-${month}-${day}`);

    // Get the milliseconds from the Date object
    const milliseconds = jsDate.getTime();

    return milliseconds;
  }

  static convertMillisecondToDay(milliseconds: number) {
    return dayjs(milliseconds).format('DD');
  }

  static convertMillisecondToMonth(milliseconds: number) {
    return dayjs(milliseconds).format('MM');
  }

  static convertMillisecondToYear(milliseconds: number) {
    return dayjs(milliseconds).format('YYYY');
  }

  static convertDateToMillisecond(date: any) {
    return dayjs(date).unix() * 1000;
  }

  static parseStringified(str: string) {
    try {
      return JSON.parse(str);
    } catch (error) {
      return str;
    }
  }
}
