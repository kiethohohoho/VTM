import classNames from 'classnames';
import React, { useImperativeHandle, useRef } from 'react';

import { type TextAreaCommonProps, type TextAreaCommonRef } from './type';
const TextAreaAntd: React.ForwardRefRenderFunction<TextAreaCommonRef, TextAreaCommonProps> = (
  { onChange, placeholder, rows, label, value, defaultValue, name, id, textareaRef, size = 'default' },
  ref,
) => {
  const nodeRef = useRef<HTMLTextAreaElement | null>(null);

  useImperativeHandle(textareaRef, () => ({
    getValue: () => {
      if (nodeRef.current) {
        return nodeRef.current.value;
      }
      return '';
    },
    focus: () => {
      if (nodeRef.current) {
        const end = nodeRef.current?.value?.length || 0;
        nodeRef.current?.setSelectionRange(end, end);
        nodeRef.current?.focus();
        return;
      }
      return '';
    },
  }));
  // const handleChange = (e: any) => {
  //   onChange && onChange(e.target.value);
  // };

  return (
    <div className={classNames('text-area-common', `size-${size}`)}>
      {label && <div className='label'>{label}:</div>}
      <textarea
        ref={nodeRef}
        className='u-custom-scrollbar'
        name={name}
        id={id}
        value={value}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

export default React.forwardRef(TextAreaAntd);
