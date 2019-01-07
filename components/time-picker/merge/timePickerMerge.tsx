import * as React from 'react';
import * as moment from 'moment';
import TimePicker from '../index';
import '../style/index.tsx';

export interface TimePickerProps {
  className?: string;
  size?: 'large' | 'default' | 'small';
  // value?: moment.Moment;
  // defaultValue?: moment.Moment | moment.Moment[];
  open?: boolean;
  format?: string;
  onChange?: (time: moment.Moment, timeString: string) => void;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  placeholder?: string;
  prefixCls?: string;
  hideDisabledOptions?: boolean;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  style?: React.CSSProperties;
  // getPopupContainer?: (triggerNode: Element) => HTMLElement;
  // addon?: Function;
  use12Hours?: boolean;
  focusOnOpen?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  allowEmpty?: boolean;
  inputReadOnly?: boolean;
  clearText?: string;
  // defaultOpenValue?: moment.Moment;
  popupClassName?: string;
  suffixIcon?: React.ReactNode;
}

export default function TimePickerMerge(props: TimePickerProps): JSX.Element {
  return <TimePicker {...props} />;
}
