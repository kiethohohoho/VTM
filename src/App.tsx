import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { CommandContextProvider } from './context/command';
import { ProviderModal } from './context/dialog';
import { LanguageProvider } from './context/languages';
import Notfound from './core2/notfound';
import { rootRoutesDemo } from './routes/indexVTM';
import { themeAntD } from './theme';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <CommandContextProvider>
        <ConfigProvider theme={themeAntD}>
          <ProviderModal>
            <QueryClientProvider client={queryClient}>
              <RouterProvider
                router={rootRoutesDemo}
                fallbackElement={<Notfound />}
              />
            </QueryClientProvider>
            <ToastContainer
              style={{
                zIndex: '10005',
              }}
            />
          </ProviderModal>
        </ConfigProvider>
      </CommandContextProvider>
    </LanguageProvider>
  );
};

ReactDOM.render(
  // <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>, // {' '}
  // </Provider>,
  document.getElementById('root'),
);
