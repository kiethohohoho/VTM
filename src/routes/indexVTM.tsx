import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import FeatureAntDComponent from '@/featureVTM';
import PageDemoComponent from '@/featureVTM/demo/view';
import DemoSdkPage from '@/featureVTM/demosdk/view';
import DepositComponent from '@/featureVTM/deposit/component';
import LoginComponent from '@/featureVTM/kyc/login/component';
// import PageDemoComponent from '@/featureVTM/demo/view';
import RegisterComponent from '@/featureVTM/kyc/register/component';
import OptionsComponent from '@/featureVTM/options/component';
import SelectComponent from '@/featureVTM/select/component';
// import StatisticsComponent from '@/featureVTM/statistics';
import WelcomeComponent from '@/featureVTM/welcome/component';
import WithdrawComponent from '@/featureVTM/withdraw/component';
import WithDrawResultComponent from '@/featureVTM/withdrawresult/component';
import AuthLayoutComponent from '@/layouts/authVTM';
import { EnumPathVTM } from '@/utils/Enums';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

const rootRoutesDemo = createBrowserRouter([
  {
    path: '/private',
    element: <FeatureAntDComponent />,
    children: [
      {
        path: EnumPathVTM.WITHDRAW,
        element: (
          <PrivateRoute
            role={[]}
            children={<WithdrawComponent />}
          />
        ),
      },
      {
        path: EnumPathVTM.WITHDRAWRESULT,
        element: (
          <PrivateRoute
            role={[]}
            children={<WithDrawResultComponent />}
          />
        ),
      },
      {
        path: EnumPathVTM.DEPOSIT,
        element: (
          <PrivateRoute
            role={[]}
            children={<DepositComponent />}
          />
        ),
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayoutComponent />,
    children: [
      {
        path: EnumPathVTM.LOGIN,
        element: <PublicRoute children={<LoginComponent />} />,
      },
      {
        path: EnumPathVTM.REGISTER,
        element: <PublicRoute children={<RegisterComponent />} />,
      },
      {
        path: '/',
        element: <WelcomeComponent />,
      },
      {
        path: EnumPathVTM.OPTIONS,
        element: <OptionsComponent />,
      },
      {
        path: EnumPathVTM.DEMO,
        element: <PageDemoComponent />,
      },
      {
        path: EnumPathVTM.DEMOSDK,
        element: <DemoSdkPage />,
      },
      {
        path: EnumPathVTM.SELECT,
        element: <SelectComponent />,
      },

      {
        path: EnumPathVTM.WITHDRAWRESULT,
        element: <PublicRoute children={<WithDrawResultComponent />} />,
      },
    ],
  },
]);

export { rootRoutesDemo };
