import * as React from 'react';
import * as moment from 'moment';
import Calendar from '../index';
// import { CalendarProps } from '../index';
import '../style/index.tsx';

export interface CalendarProps {
  prefixCls?: string;
  className?: string;
  value?: moment.Moment;
  defaultValue?: moment.Moment;
  mode?: 'month' | 'year';
  fullscreen?: boolean;
  /*dateCellRender?: (date: moment.Moment) => React.ReactNode;
  monthCellRender?: (date: moment.Moment) => React.ReactNode;
  dateFullCellRender?: (date: moment.Moment) => React.ReactNode;
  monthFullCellRender?: (date: moment.Moment) => React.ReactNode;*/
  locale?: any;
  style?: React.CSSProperties;
  onPanelChange?: (date?: moment.Moment, mode?: 'month' | 'year') => void;
  onSelect?: (date?: moment.Moment) => void;
  onChange?: (date?: moment.Moment) => void;
  disabledDate?: (current: moment.Moment) => boolean;
  validRange?: [moment.Moment, moment.Moment];
}

export default function CalendarMerge(props: CalendarProps): JSX.Element {
  return <Calendar {...props} />;
}
