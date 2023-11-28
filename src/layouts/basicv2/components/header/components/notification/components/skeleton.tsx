import { Skeleton } from '@progress/kendo-react-indicators';
import { CardBody } from '@progress/kendo-react-layout';
import React from 'react';

const SkeletonNotification = () => {
  return (
    <React.Fragment>
      {Array.from(Array(4)).map((i, idx) => {
        return (
          <div key={SkeletonNotification.name + idx.toString()}>
            <CardBody
              style={{
                height: '88px',
              }}
              className='flex hover:bg-neutral-30 cursor-pointer'>
              <Skeleton
                shape='circle'
                style={{
                  width: '35px',
                  height: '32px',
                }}
              />
              <div className='flex flex-column gap-3 w-80 pl-5'>
                <div className='flex flex-column'>
                  <span className='text-neutral-100'>
                    <Skeleton
                      style={{
                        height: '20px',
                      }}
                      shape='text'
                    />
                  </span>
                  <div
                    style={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                    className='pr-4 w-64'>
                    <span className='text-xs text-neutral-80'>
                      <Skeleton
                        style={{
                          height: '10px',
                        }}
                        shape='text'
                      />
                    </span>
                  </div>
                  <span className='text-xs text-neutral-100'>
                    <Skeleton
                      style={{
                        height: '10px',
                      }}
                      shape='text'
                    />
                  </span>
                </div>
                <div className='flex gap-1'>
                  <Skeleton
                    style={{
                      height: '10px',
                      width: '50px',
                    }}
                    shape='text'
                  />
                  <Skeleton
                    style={{
                      height: '10px',
                      width: '100px',
                    }}
                    shape='text'
                  />
                </div>
              </div>
            </CardBody>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default SkeletonNotification;
