export interface TypographyTitle {
  level: 1 | 2 | 3 | 4 | 5;
  content?: string;
  className?: string;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
}

export interface TypographyText {
  className?: string;
  content?: string;
}
