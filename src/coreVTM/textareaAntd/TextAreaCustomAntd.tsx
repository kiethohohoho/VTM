import '@/assets/scss2/theme/_textareacommon.scss';

import { Input } from 'antd';
import classNames from 'classnames';

import { type TextAreaCustomProps } from './type';
const { TextArea } = Input;
const TextAreaCustomAntd = ({
  onChange,
  placeholder,
  rows,
  label,
  value,
  name,
  id,
  size = 'default',
  showCount,
  maxLength,
  style,
}: TextAreaCustomProps) => {
  return (
    <div className={classNames('text-area-common', `size-${size}`)}>
      {label && <div className='label u-title'>{label}:</div>}
      <TextArea
        name={name}
        value={value}
        rows={rows}
        maxLength={maxLength}
        style={style}
        placeholder={placeholder}
        showCount={showCount}
        onChange={onChange}
      />
    </div>
  );
};

export default TextAreaCustomAntd;
