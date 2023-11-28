import { DropDownList, type DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import React from 'react';

import { Helper } from '@/utils/Helper';

const categories = [50, 100, 150];

interface IPaginationComponent {
  onPrev: () => void;
  onNext: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onChangePage: (index: number) => void;
  onTakePage: (event: DropDownListChangeEvent) => void;
  length: number;
  pagination: {
    from: number;
    take: number;
  };
}

const PaginationComponent: React.FC<IPaginationComponent> = ({
  length,
  onFirstPage,
  onLastPage,
  onNext,
  onPrev,
  onTakePage,
  pagination,
  onChangePage,
}) => {
  const numberOfPages = Array.from(Array(Math.ceil(length / pagination.take)));

  return (
    <div className='ls-flex ls-justify_between ls-items_center'>
      <div className='ls-flex ls-gap_4'>
        <section
          style={{
            color: '#8E8E8E',
          }}
          className='ls-flex ls-gap_2'>
          <article className='ls-flex ls-gap_2 ls-items_center'>
            <span
              onClick={onFirstPage}
              className='k-icon k-i-arrow-end-left ls-cursor_pointer'></span>
            <span
              onClick={onPrev}
              className='k-icon k-i-arrow-60-left ls-cursor_pointer'></span>
          </article>
          <article className='ls-flex ls-items_center'>
            {numberOfPages.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    onChangePage(index);
                  }}
                  key={'numberOfPages' + index.toString()}
                  className='ls-cursor_pointer ls-h_8 ls-w_8 ls-flex ls-items_center ls-justify_center ls-rounded_full'
                  style={{
                    color: 'black',
                    background: Helper.equalTwoNumber(index, pagination.from) ? '#CCCCCC' : 'white',
                  }}>
                  {index + 1}
                </div>
              );
            })}
          </article>
          <article className='ls-flex ls-gap_2 ls-items_center'>
            <span
              onClick={onNext}
              className='k-icon k-i-arrow-60-right ls-cursor_pointer'></span>
            <span
              onClick={onLastPage}
              className='k-icon k-i-arrow-end-right ls-cursor_pointer'></span>
          </article>
        </section>
        <section className='ls-flex ls-justify_center ls-items_center ls-gap_2'>
          <article>
            <DropDownList
              onChange={onTakePage}
              style={{ width: '100px', height: '33px', background: 'white' }}
              data={categories}
              defaultValue='50'
            />
          </article>
          <article
            style={{
              color: '#rgb(134,85,74)',
            }}
            className='ls-text_sm'>
            items per page
          </article>
        </section>
      </div>
      <div className='ls-text_sm'>
        {pagination.from * pagination.take + 1} -{' '}
        {Helper.equalNumberAndConditionNumber(length, pagination.take * (pagination.from + 1))
          ? pagination.take * (pagination.from + 1)
          : length}{' '}
        of {length} items
      </div>
    </div>
  );
};

export default PaginationComponent;
