import React from 'react';
import { Link } from 'react-router-dom';

import { Localize } from '@/context/languages';
import { Helper } from '@/utils/Helper';

import { type ICategory } from '..';
interface IRowLayer2Component {
  subCategory: ICategory;
  onGetIdLayer1: (idLayer1: string) => void;
  idLayer1Extend: string;
  index: number;
  lastChild: boolean;
  storeId: string;
}

const RowLayer2Component: React.FC<IRowLayer2Component> = ({
  subCategory,
  idLayer1Extend,
  onGetIdLayer1,
  index,
  lastChild,
  storeId,
}) => {
  return (
    <React.Fragment>
      <article
        style={{
          background: Helper.equalTwoIdCategory(subCategory.categoryId, idLayer1Extend) ? '#D4D7DD' : '#EAE9E9',
          borderColor: '#9DB2BF',
        }}
        className={`ls-flex ls-flex-col ls-gap_2 ${lastChild ? 'ls-rounded-b' : 'ls-bd_b'}`}>
        <section className='ls-w_full ls-flex ls-items_center'>
          <div className='ls-w_14 ls-text_align-center'>{index + 1}</div>
          <div className='ls-grid ls-grid-col-2 ls-w_full'>
            <Link
              to={`${subCategory.categoryId}/${storeId}`}
              className='ls-py_medium ls-h_8 ls-flex ls-items_center'>
              {subCategory.name}
            </Link>
            <div className='ls-py_medium ls-h_8 ls-flex ls-items_center'>{subCategory.code}</div>
            {/* <div className='ls-py_medium ls-h_8 ls-flex ls-items_center'>{subCategory.slug}</div> */}
          </div>
          <div
            className='ls-w_10 ls-text_align-start ls-cursor_pointer'
            onClick={() => {
              onGetIdLayer1(subCategory.categoryId);
            }}>
            <span className='k-icon k-i-arrow-chevron-down'></span>
          </div>
        </section>
        {Helper.equalTwoIdCategory(subCategory.categoryId, idLayer1Extend) && (
          <div className='ls-flex ls-flex-col ls-gap_2'>
            <article className='ls-flex ls-px_larger ls-gap_3 ls-items_center'>
              <h1 className='ls-text_xl'>
                <Localize tid={'core.category.tableLayer3'} />
              </h1>
            </article>
            <article className='ls-flex ls-gap_4 ls-mx_larger ls-mb_larger ls-rounded_xl'>
              <div className='ls-w_full'>
                <section
                  style={{
                    borderColor: '#545659',
                    color: '#545659',
                  }}
                  className='ls-bd ls-rounded_xl'>
                  <article
                    style={{
                      borderColor: '#545659',
                    }}
                    className='ls-flex ls-h_10 ls-items_center ls-bd_b ls-bd_secondary'>
                    <div className='ls-w_14 ls-text_align-center'>#</div>
                    <div className='ls-grid ls-grid-col-2 ls-w_full'>
                      <div>
                        <Localize tid={'category.name'} />
                      </div>
                      <div>
                        <Localize tid={'category.code'} />
                      </div>
                      {/* <div>
                        <Localize tid={'core.category.slug'} />
                      </div> */}
                    </div>
                    <div className='ls-w_10'></div>
                  </article>
                  {Helper.isArrayEmpty(subCategory.subCategoryList) && (
                    <article className='ls-flex ls-flex-col ls-h_10 ls-items_center ls-bd_secondary ls-justify_center ls-rounded_xl ls-py_medium'>
                      <div>
                        <span className='k-icon k-i-inbox ls-text_2xl'></span>
                      </div>
                      <Localize tid={'core.category.nodata'} />
                    </article>
                  )}
                  {subCategory.subCategoryList.map((subSecond, index) => {
                    const lastChildOfSubCategory = Helper.equalLengthArrayAndIndex(index, subCategory.subCategoryList);

                    return (
                      <article
                        style={{
                          borderColor: '#545659',
                        }}
                        key={'subSecond' + index.toString()}
                        className={`ls-flex ls-h_10 ls-items_center ls-py_sm ${
                          lastChildOfSubCategory ? 'ls-rounded-b' : 'ls-bd_b'
                        }`}>
                        <div className='ls-w_14 ls-text_align-center'>{index + 1}</div>
                        <div className='ls-grid ls-grid-col-2 ls-w_full'>
                          <Link
                            to={`${subCategory.categoryId}/${storeId}`}
                            className='ls-cursor_pointer'>
                            {subCategory.name}
                          </Link>
                          <div>{subCategory.code}</div>
                          {/* <div>{subCategory.slug}</div> */}
                        </div>
                        <div className='ls-w_10'></div>
                      </article>
                    );
                  })}
                </section>
              </div>
            </article>
          </div>
        )}
      </article>
    </React.Fragment>
  );
};

export default RowLayer2Component;
