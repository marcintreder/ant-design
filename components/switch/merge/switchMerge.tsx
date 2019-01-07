import * as React from 'react';
import * as moment from 'moment';
import Switch from '../index';
import '../style/index.tsx';

export interface SwitchMergeProps {
  prefixCls?: string;
  size?: 'small' | 'default';
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => any;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  style?: React.CSSProperties;
}

export default function SwitchMerge(props: SwitchMergeProps): JSX.Element {
  return <Switch {...props} />;
}

