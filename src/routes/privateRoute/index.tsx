/** * @author: Thuy Phan */

import React from 'react';
import { Navigate } from 'react-router-dom';

import AuthService from '@/utils/Auth';
import { EnumPathVTM, type EnumRole } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';

export interface IPrivateRoute {
  children: React.ReactElement;
  role: EnumRole[] | [];
}

function PrivateRoute({ role, children }: IPrivateRoute) {
  const auth = AuthService.getPackageAuth();
  const profile = AuthService.getPackageProfile();
  const roleProfile = profile?.role;
  if (Helper.isEmpty(auth)) {
    return (
      <Navigate
        to={EnumPathVTM.LOGIN}
        replace
      />
    );
  }
  const allow =
    role.length > 0 ? role.filter(item1 => roleProfile.some((item2: any) => item1 === item2)).length > 0 : true;

  return allow ? (
    children
  ) : (
    <Navigate
      to={'/no-permission'}
      replace
    />
  );
}

export default PrivateRoute;
