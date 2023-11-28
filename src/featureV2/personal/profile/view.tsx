import React from 'react';

import avatar from '@/assets/images/default/core/default.jpg';
import { CardForm, CardPage } from '@/core2/card';
import { ScreenLoader } from '@/core2/loader';

import { type IItemResponse } from './component';
import { ProfileForm } from './components/formInformation';

interface IViewProfile {
  data: IItemResponse;
  loading: boolean;
}

function ViewProfile({ data, loading }: IViewProfile) {
  return (
    <div>
      <CardPage
        title='profile.title'
        className='px-10'>
        {!loading ? (
          <CardForm className='flex flex-wrap  flex-column'>
            <section className='flex-1'>
              <article className='flex flex-column'>
                <div>
                  <img
                    src={avatar}
                    alt={data?.name}
                    className='w-20 h-20 rounded-full'
                  />
                </div>
                <h3 className='m-0'>{data?.name}</h3>
              </article>
            </section>
            <section className='flex-1'>
              <ProfileForm data={data} />
            </section>
          </CardForm>
        ) : (
          <ScreenLoader />
        )}
      </CardPage>
    </div>
  );
}

export { ViewProfile };
