// import './CollapsibleContent.scss';

import { useToggleCommon } from '@/hooks/useToggle';

import { type CollapsibleContentProps } from './type';

export const CollapsibleContent = ({ content, maxLength = 100 }: CollapsibleContentProps) => {
  const { isEnable: isShowAll, onToggle } = useToggleCommon(false);

  return (
    <div
      className='collapsible-content'
      style={{
        whiteSpace: 'break-spaces',
      }}>
      {isShowAll ? content : content?.substr(0, maxLength)}
      {content?.length > maxLength && (
        <>
          &nbsp;
          <span
            tabIndex={0}
            onClick={onToggle}
            className='action'>
            {isShowAll ? 'Read less' : 'Read more'}
          </span>
        </>
      )}
    </div>
  );
};
