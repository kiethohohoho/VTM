import { Button } from 'antd';
import { type LinkProps as RouterLinkProps, NavLink as RouterLink } from 'react-router-dom';

interface LinkProps extends Omit<RouterLinkProps, 'to'> {
  href?: string;
  children?: string;
  useExternal?: boolean;
  customClassName?: string;
  search?: string;
}

const LinkRootAntD: React.FC<LinkProps> = ({ href, children, useExternal, search, customClassName, ...props }) => {
  if (!href) {
    return (
      <Button
        type='link'
        className={customClassName}>
        {children}
      </Button>
    );
  }
  if (href.includes('http') || useExternal) {
    return (
      <Button
        href={href}
        type='link'
        rel='noreferrer'
        className={customClassName}>
        {children}
      </Button>
    );
  }
  return (
    <RouterLink
      {...props}
      to={{ pathname: href, search }}
      className={customClassName}
      aria-label='label'>
      {children}
    </RouterLink>
  );
};

export default LinkRootAntD;
