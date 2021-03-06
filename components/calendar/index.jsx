import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { PREFIX_CLS } from './Constants';
import Header from './Header';
import interopDefault from '../_util/interopDefault';
import enUS from './locale/en_US';
function noop() {
  return null;
}
function zerofixed(v) {
  if (v < 10) {
    return `0${v}`;
  }
  return `${v}`;
}
export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.monthCellRender = value => {
      const { prefixCls, monthCellRender = noop } = this.props;
      return (
        <div className={`${prefixCls}-month`}>
          <div className={`${prefixCls}-value`}>{value.localeData().monthsShort(value)}</div>
          <div className={`${prefixCls}-content`}>{monthCellRender(value)}</div>
        </div>
      );
    };
    this.dateCellRender = value => {
      const { prefixCls, dateCellRender = noop } = this.props;
      return (
        <div className={`${prefixCls}-date`}>
          <div className={`${prefixCls}-value`}>{zerofixed(value.date())}</div>
          <div className={`${prefixCls}-content`}>{dateCellRender(value)}</div>
        </div>
      );
    };
    this.setValue = (value, way) => {
      if (!('value' in this.props)) {
        this.setState({ value });
      }
      if (way === 'select') {
        if (this.props.onSelect) {
          this.props.onSelect(value);
        }
      } else if (way === 'changePanel') {
        this.onPanelChange(value, this.state.mode);
      }
    };
    this.setType = type => {
      const mode = type === 'date' ? 'month' : 'year';
      if (this.state.mode !== mode) {
        this.setState({ mode });
        this.onPanelChange(this.state.value, mode);
      }
    };
    this.onHeaderValueChange = value => {
      this.setValue(value, 'changePanel');
    };
    this.onHeaderTypeChange = type => {
      this.setType(type);
    };
    this.onSelect = value => {
      this.setValue(value, 'select');
    };
    this.getDateRange = (validRange, disabledDate) => current => {
      if (!current) {
        return false;
      }
      const [startDate, endDate] = validRange;
      const inRange = !current.isBetween(startDate, endDate, 'days', '[]');
      if (disabledDate) {
        return disabledDate(current) || inRange;
      }
      return inRange;
    };
    this.renderCalendar = (locale, localeCode) => {
      const { state, props } = this;
      const { value, mode } = state;
      if (value && localeCode) {
        value.locale(localeCode);
      }
      const {
        prefixCls,
        style,
        className,
        fullscreen,
        dateFullCellRender,
        monthFullCellRender,
      } = props;
      const type = mode === 'year' ? 'month' : 'date';
      let cls = className || '';
      if (fullscreen) {
        cls += ` ${prefixCls}-fullscreen`;
      }
      const monthCellRender = monthFullCellRender || this.monthCellRender;
      const dateCellRender = dateFullCellRender || this.dateCellRender;
      let disabledDate = props.disabledDate;
      if (props.validRange) {
        disabledDate = this.getDateRange(props.validRange, disabledDate);
      }
      return (
        <div className={cls} style={style}>
          <Header
            fullscreen={fullscreen}
            type={type}
            value={value}
            locale={locale.lang}
            prefixCls={prefixCls}
            onTypeChange={this.onHeaderTypeChange}
            onValueChange={this.onHeaderValueChange}
            validRange={props.validRange}
          />
          <FullCalendar
            {...props}
            disabledDate={disabledDate}
            Select={noop}
            locale={locale.lang}
            type={type}
            prefixCls={prefixCls}
            showHeader={false}
            value={value}
            monthCellRender={monthCellRender}
            dateCellRender={dateCellRender}
            onSelect={this.onSelect}
          />
        </div>
      );
    };
    this.getDefaultLocale = () => {
      const result = Object.assign({}, enUS, this.props.locale);
      result.lang = Object.assign({}, result.lang, (this.props.locale || {}).lang);
      return result;
    };
    const value = props.value || props.defaultValue || interopDefault(moment)();
    if (!interopDefault(moment).isMoment(value)) {
      throw new Error(
        'The value/defaultValue of Calendar must be a moment object after `antd@2.0`, ' +
          'see: https://u.ant.design/calendar-value',
      );
    }
    this.state = {
      value,
      mode: props.mode,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
    if ('mode' in nextProps && nextProps.mode !== this.props.mode) {
      this.setState({
        mode: nextProps.mode,
      });
    }
  }
  onPanelChange(value, mode) {
    const { onPanelChange, onChange } = this.props;
    if (onPanelChange) {
      onPanelChange(value, mode);
    }
    if (onChange && value !== this.state.value) {
      onChange(value);
    }
  }
  render() {
    return (
      <LocaleReceiver componentName="Calendar" defaultLocale={this.getDefaultLocale}>
        {this.renderCalendar}
      </LocaleReceiver>
    );
  }
}
Calendar.defaultProps = {
  locale: {},
  fullscreen: true,
  prefixCls: PREFIX_CLS,
  mode: 'month',
  onSelect: noop,
  onPanelChange: noop,
  onChange: noop,
};
Calendar.propTypes = {
  monthCellRender: PropTypes.func,
  dateCellRender: PropTypes.func,
  monthFullCellRender: PropTypes.func,
  dateFullCellRender: PropTypes.func,
  fullscreen: PropTypes.bool,
  locale: PropTypes.object,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onPanelChange: PropTypes.func,
  value: PropTypes.object,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
};
