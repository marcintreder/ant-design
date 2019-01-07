import * as React from 'react';
import Avatar from '../index';
// import { AvatarProps } from '../index';
import '../style/index.tsx';

export interface AvatarProps {
  /** Shape of avatar, options:`circle`, `square` */
  shape?: 'circle' | 'square';
  /*
   * Size of avatar, options: `large`, `small`, `default`
   * or a custom number size
   * */
  size?: 'large' | 'small' | 'default' | number;
  /** Src of image avatar */
  src?: string;
  /** Srcset of image avatar */
  srcSet?: string;
  /** Type of the Icon to be used in avatar */
  icon?: string;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  children?: any;
  alt?: string;
  /* callback when img load error */
  /* return false to prevent Avatar show default fallback behavior, then you can do fallback by your self*/
  onError?: () => boolean;
}

export default function AvatarMerge(props: AvatarProps): JSX.Element {
  return <Avatar {...props} />;
}
