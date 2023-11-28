import React from 'react';
import { Link } from 'react-router-dom';

import { Localize } from '@/context/languages';
import { Helper } from '@/utils/Helper';

import { type ICategory } from '..';
import RowLayer2Component from './rowLayer2';

interface IRowLayer1Component {
  category: ICategory;
  index: number;
  onGetIdLayer0: (idLayer0: string) => void;
  onGetIdLayer1: (idLayer1: string) => void;
  idLayer0Extend: string;
  idLayer1Extend: string;
  storeId: string;
}

interface ILineItem {
  label: string | React.ReactNode;
  value: string | number;
}
export const LineItem: React.FC<ILineItem> = ({ label, value }) => {
  return (
    <div className='ls-flex'>
      <div className='ls-w_36'>{label}: </div>
      <div>
        <span className='ls-px_medium'>{value}</span>
      </div>
    </div>
  );
};

const RowLayer1Component: React.FC<IRowLayer1Component> = ({
  category,
  index,
  onGetIdLayer0,
  idLayer0Extend,
  idLayer1Extend,
  onGetIdLayer1,
  storeId,
}) => {
  return (
    <article
      style={{
        background: Helper.equalTwoIdCategory(category.categoryId, idLayer0Extend) ? '#F6F6F6' : '#fff',
      }}
      className={'ls-flex ls-flex-col ls-bd_b ls-bd_secondary'}>
      <section className='ls-w_full ls-flex ls-items_center'>
        <div className='ls-w_20 ls-text_align-center'>{index + 1}</div>
        <div className='ls-grid ls-grid-col-2 ls-w_full'>
          <div className='ls-py_medium ls-h_8 ls-flex ls-items_center'>
            <Link
              to={`${category.categoryId}/${storeId}`}
              className='ls-cursor_pointer'>
              {category.name}
            </Link>
          </div>
          <div className='ls-py_medium ls-h_8 ls-flex ls-items_center'>{category.code}</div>
        </div>
        <div
          className='ls-w_10 ls-text_align-start ls-cursor_pointer'
          onClick={() => {
            onGetIdLayer0(category.categoryId);
          }}>
          <span className='k-icon k-i-arrow-chevron-down'></span>
        </div>
      </section>
      {Helper.equalTwoIdCategory(category.categoryId, idLayer0Extend) && (
        <article
          style={{
            background: '#EAE9E9',
            borderColor: '#B7B7B7',
          }}
          className='ls-flex ls-gap_4 ls-mx_larger ls-mb_larger ls-p_larger ls-rounded_xl ls-bd'>
          <div
            style={{
              minWidth: 400,
            }}
            className='ls-flex ls-flex-col ls-gap_3'>
            <div className='ls-flex ls-justify_between ls-items_center'>
              <h1 className='ls-text_2xl'>
                <Localize tid={'core.category.infoBasic'} />
              </h1>
            </div>
            <LineItem
              label={<Localize tid={'category.name'} />}
              value={category.name}
            />
            <LineItem
              label={<Localize tid={'category.code'} />}
              value={category.code}
            />
          </div>
          <div className='ls-w_full ls-flex ls-flex-col ls-gap_2'>
            <div className='ls-flex ls-gap_3 ls-items_center'>
              <h1 className='ls-text_2xl'>
                <Localize tid={'core.category.tableLayer2'} />
              </h1>
            </div>
            <section
              style={{
                borderColor: '#9DB2BF',
                color: '#146C94',
              }}
              className='ls-bd ls-rounded_xl ls-w_full'>
              <article
                style={{
                  borderColor: '#9DB2BF',
                }}
                className='ls-flex ls-h_10 ls-items_center ls-bd_b'>
                <div className='ls-w_14 ls-text_align-center'>#</div>
                <div className='ls-grid ls-grid-col-2 ls-w_full'>
                  <div>
                    <Localize tid={'category.name'} />
                  </div>
                  <div>
                    <Localize tid={'category.code'} />
                  </div>
                </div>
                <div className='ls-w_10'></div>
              </article>
              {Helper.isArrayEmpty(category.subCategoryList) && (
                <article className='ls-flex ls-flex-col ls-h_10 ls-items_center ls-bd_secondary ls-justify_center ls-rounded_xl ls-py_medium'>
                  <div>
                    <span className='k-icon k-i-inbox ls-text_2xl'></span>
                  </div>
                  <Localize tid={'core.category.nodata'} />
                </article>
              )}
              {category.subCategoryList.map((subCategory, index) => {
                return (
                  <RowLayer2Component
                    lastChild={index === category.subCategoryList.length - 1}
                    index={index}
                    idLayer1Extend={idLayer1Extend}
                    onGetIdLayer1={onGetIdLayer1}
                    subCategory={subCategory}
                    key={'subCategoryList' + index.toString() + subCategory.name}
                    storeId={storeId}
                  />
                );
              })}
            </section>
          </div>
        </article>
      )}
    </article>
  );
};

export default RowLayer1Component;
