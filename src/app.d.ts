declare namespace NodeJS {
  interface ProcessEnv {
    // types of envs
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    APP_VERSION: string;
    npm_package_version: string;
    npm_package_name: string;
  }
}

declare let process: {
  env: {
    VIEW_OFFICE_APP: any;
    CDN_STORAGE_URL: string;
    CDN_STORAGE_URL: any;
    OMS_WEB_API_URL: any;
    PUBLIC_URL: string;
    NODE_ENV: string;
    APP_VERSION: string;
    npm_package_version: string;
    npm_package_name: string;
  };
};
