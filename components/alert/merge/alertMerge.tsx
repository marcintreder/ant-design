import * as React from 'react';
import Alert from '../index';
// import { AvatarProps } from '../index';
import '../style/index.tsx';

export interface AlertProps {
  /**
   * Type of Alert styles, options:`success`, `info`, `warning`, `error`
   */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** Whether Alert can be closed */
  closable?: boolean;
  /** Close text to show */
  closeText?: React.ReactNode;
  /** Content of Alert */
  message: React.ReactNode;
  /** Additional content of Alert */
  description?: React.ReactNode;
  /** Callback when close Alert */
  onClose?: React.MouseEventHandler<HTMLAnchorElement>;
  /** Trigger when animation ending of Alert */
  afterClose?: () => void;
  /** Whether to show icon */
  showIcon?: boolean;
  iconType?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  banner?: boolean;
  icon?: React.ReactNode;
}

export default function AvatarMerge(props: AlertProps): JSX.Element {
  return <Alert {...props} />;
}
