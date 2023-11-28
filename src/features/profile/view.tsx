import './_index.scss';

import React from 'react';

import avatar from '@/assets/images/default/core/default.jpg';
import { CardPage } from '@/core2/card';
import { ScreenLoader } from '@/core2/loader';

import { type IItemResponse } from './component';
import FormInformation from './components/formInformation';

interface IProfileView {
  data: IItemResponse;
  loading: boolean;
}

function ProfileView({ data, loading }: IProfileView) {
  return (
    <div>
      <CardPage>
        {!loading ? (
          <div className='ls-profile-grid_col3'>
            <section>
              <article className='ls-flex ls-flex-col ls-items_center ls-gap_3 ls-w_full ls-py_medium '>
                <div>
                  <img
                    style={{
                      width: 200,
                      height: 200,
                    }}
                    className='ls-objectFit_cover ls-rounded_full'
                    src={avatar}
                    alt={data?.name}
                  />
                </div>
                <div>
                  <h2>{data?.name}</h2>
                </div>
              </article>
            </section>
            <FormInformation data={data} />
          </div>
        ) : (
          <ScreenLoader />
        )}
      </CardPage>
    </div>
  );
}

export default React.memo(ProfileView);
