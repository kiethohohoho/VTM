import ConfigJson from '@/config.json';
class Config {
  static instance: any;
  state: any;
  constructor() {
    if (Config.instance) {
      return Config.instance;
    }
    this.state = {
      version: APP_VERSION,
      ...ConfigJson,
    };
    this.getState = this.getState.bind(this);
    this.setState = this.setState.bind(this);
    Config.instance = this;
  }

  getState(): typeof ConfigJson {
    return this.state;
  }

  setState(state: any) {
    this.state = state;
  }
}
export default Config;
