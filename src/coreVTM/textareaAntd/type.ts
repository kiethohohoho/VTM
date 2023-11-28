export interface TextAreaCommonProps {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
  value?: string;
  defaultValue?: string;
  name?: string;
  id?: string;
  textareaRef?: React.RefObject<TextAreaCommonRef>;
  size?: 'default' | 'large';
}

export interface TextAreaCommonRef {
  getValue: () => string;
  focus: () => void;
}

export interface TextAreaCustomProps {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
  value?: string;
  name?: string;
  id?: string;
  size?: 'default' | 'large';
  showCount?: boolean;
  maxLength?: number;
  className?: string;
  style?: React.CSSProperties;
}
