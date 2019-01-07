import * as React from 'react';
import Dropdown from '../index';
import '../style/index.tsx';

export interface DropdownMergeProps {
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  overlay: React.ReactNode;
  onVisibleChange?: (visible: boolean) => void;
  visible?: boolean;
  disabled?: boolean;
  align?: Object;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  prefixCls?: string;
  className?: string;
  transitionName?: string;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  forceRender?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

export default function DropdownMerge(props: DropdownMergeProps): JSX.Element {
  return <Dropdown {...props} />;
}

