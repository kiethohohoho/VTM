import dayjs from 'dayjs';

const envValue: string = process.env.NODE_ENV;

const getTime = (): string => {
  return dayjs().format('HH:mm:ss DD/MM/YYYY');
};

export class LoggerService {
  /**
   * @param {string} message
   */
  static info(message: string) {
    if (envValue !== 'production') {
      const log = `[${getTime()}][INFO] ${message}`;
      console.log(`%c ${log}`, 'color: #5D9C59');
    }
  }

  /**
   * @param {string} message
   * @param {string | object} content
   */
  static debug(message: string, content: string | object) {
    if (typeof content === 'object') {
      content = JSON.stringify(content);
    }
    if (envValue !== 'production') {
      const log = `[${getTime()}][DEBUG] ${message} ${content}`;
      console.log(`%c ${log}`, 'color: #2F58CD');
    }
  }

  /**
   * @param {string} message
   * @param {string | object} content
   */
  static error(message: string, content: string | object) {
    if (typeof content === 'object') {
      content = JSON.stringify(content);
    }
    if (envValue !== 'production') {
      const log = `[${getTime()}][ERROR] ${message} ${content}`;
      console.log(`%c ${log}`, 'color: #EB455F');
    }
  }

  /**
   * @param {string} message
   * @param {string | object} content
   */
  static warn(message: string, content: string | object) {
    if (typeof content === 'object') {
      content = JSON.stringify(content);
    }
    if (envValue !== 'production') {
      const log = `[${getTime()}][WARN] ${message} ${content}`;
      console.log(`%c ${log}`, 'color: #FF7F3F');
    }
  }

  /**
   * @param {array} content
   */
  static table(content?: string[] | number[]) {
    if (envValue !== 'production') {
      console.table(content);
    }
  }
}
