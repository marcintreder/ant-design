import * as React from 'react';
import * as moment from 'moment';
import DatePicker from '../index';
import '../style/index.tsx';

export interface DatePickerProps {
  id?: number | string;
  prefixCls?: string;
  inputPrefixCls?: string;
  format?: string | string[];
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
  suffixIcon?: React.ReactNode;
  style?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  dropdownClassName?: string;
  locale?: any;
  size?: 'large' | 'small' | 'default';
  getCalendarContainer?: (triggerNode: Element) => HTMLElement;
  open?: boolean;
  onOpenChange?: (status: boolean) => void;
  disabledDate?: (current: moment.Moment | undefined) => boolean;
  placeholder?: string;
  showTime?: boolean;
  // renderExtraFooter?: () => React.ReactNode;
  // dateRender?: (current: moment.Moment, today: moment.Moment) => React.ReactNode;
}

export default function DatePickerMerge(props: DatePickerProps): JSX.Element {
  return <DatePicker {...props} />;
}
