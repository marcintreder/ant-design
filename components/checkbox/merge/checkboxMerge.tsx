import * as React from 'react';
import Checkbox from '../index';
import '../style/index.tsx';

export interface CheckboxMergeProps {
  prefixCls?: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: T) => void;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  onKeyPress?: React.KeyboardEventHandler<any>;
  onKeyDown?: React.KeyboardEventHandler<any>;
  value?: any;
  tabIndex?: number;
  name?: string;
  children?: React.ReactNode;
}

export default function CheckboxMerge(props: CheckboxMergeProps): JSX.Element {
  return (
    <div style={{width: "auto"}}>
      <Checkbox {...props}>{props.children}</Checkbox>
    </div>
    );
}

