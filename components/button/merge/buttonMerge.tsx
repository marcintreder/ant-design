import * as React from 'react';
import Button from '../index';

export interface BaseButtonProps {
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'danger';
  icon?: string;
  shape?: 'default' | 'circle' | 'circle-outline';
  size?: 'large' | 'default' | 'small';
  loading?: boolean | { delay?: number };
  className?: string;
  ghost?: boolean;
  block?: boolean;
  href: string;
  target?: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  htmlType?: 'submit' | 'button' | 'reset';
  children?: React.ReactNode;
}

export default function ButtonMerge(props: BaseButtonProps): JSX.Element {
  return (
    <Button {...props}>{props.children}</Button>
  )
}
