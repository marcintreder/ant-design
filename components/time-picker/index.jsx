var __rest =
  (this && this.__rest) ||
  function(s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    return t;
  };
import * as React from 'react';
import * as moment from 'moment';
import { polyfill } from 'react-lifecycles-compat';
import RcTimePicker from 'rc-time-picker/lib/TimePicker';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigConsumer } from '../config-provider';
import defaultLocale from './locale/en_US';
import interopDefault from '../_util/interopDefault';
import Icon from '../icon';
export function generateShowHourMinuteSecond(format) {
  // Ref: http://momentjs.com/docs/#/parsing/string-format/
  return {
    showHour: format.indexOf('H') > -1 || format.indexOf('h') > -1 || format.indexOf('k') > -1,
    showMinute: format.indexOf('m') > -1,
    showSecond: format.indexOf('s') > -1,
  };
}
class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = value => {
      if (!('value' in this.props)) {
        this.setState({ value });
      }
      const { onChange, format = 'HH:mm:ss' } = this.props;
      if (onChange) {
        onChange(value, (value && value.format(format)) || '');
      }
    };
    this.handleOpenClose = ({ open }) => {
      const { onOpenChange } = this.props;
      if (onOpenChange) {
        onOpenChange(open);
      }
    };
    this.saveTimePicker = timePickerRef => {
      this.timePickerRef = timePickerRef;
    };
    this.renderTimePicker = locale => {
      const _a = this.props,
        { getPopupContainer } = _a,
        props = __rest(_a, ['getPopupContainer']);
      delete props.defaultValue;
      const format = this.getDefaultFormat();
      const className = classNames(props.className, {
        [`${props.prefixCls}-${props.size}`]: !!props.size,
      });
      const addon = panel =>
        props.addon ? (
          <div className={`${props.prefixCls}-panel-addon`}>{props.addon(panel)}</div>
        ) : null;
      const { suffixIcon, prefixCls } = props;
      const clockIcon = (suffixIcon &&
        (React.isValidElement(suffixIcon) ? (
          React.cloneElement(suffixIcon, {
            className: classNames({
              [suffixIcon.props.className]: suffixIcon.props.className,
              [`${prefixCls}-clock-icon`]: true,
            }),
          })
        ) : (
          <span className={`${prefixCls}-clock-icon`}>{suffixIcon}</span>
        ))) || <Icon type="clock-circle" className={`${prefixCls}-clock-icon`} theme="outlined" />;
      const inputIcon = <span className={`${prefixCls}-icon`}>{clockIcon}</span>;
      const clearIcon = (
        <Icon type="close-circle" className={`${prefixCls}-panel-clear-btn-icon`} theme="filled" />
      );
      return (
        <ConfigConsumer>
          {({ getPopupContainer: getContextPopupContainer }) => {
            return (
              <RcTimePicker
                {...generateShowHourMinuteSecond(format)}
                {...props}
                getPopupContainer={getPopupContainer || getContextPopupContainer}
                ref={this.saveTimePicker}
                format={format}
                className={className}
                value={this.state.value}
                placeholder={
                  props.placeholder === undefined ? locale.placeholder : props.placeholder
                }
                onChange={this.handleChange}
                onOpen={this.handleOpenClose}
                onClose={this.handleOpenClose}
                addon={addon}
                inputIcon={inputIcon}
                clearIcon={clearIcon}
              />
            );
          }}
        </ConfigConsumer>
      );
    };
    const value = props.value || props.defaultValue;
    if (value && !interopDefault(moment).isMoment(value)) {
      throw new Error(
        'The value/defaultValue of TimePicker must be a moment object after `antd@2.0`, ' +
          'see: https://u.ant.design/time-picker-value',
      );
    }
    this.state = {
      value,
    };
  }
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return { value: nextProps.value };
    }
    return null;
  }
  focus() {
    this.timePickerRef.focus();
  }
  blur() {
    this.timePickerRef.blur();
  }
  getDefaultFormat() {
    const { format, use12Hours } = this.props;
    if (format) {
      return format;
    } else if (use12Hours) {
      return 'h:mm:ss a';
    }
    return 'HH:mm:ss';
  }
  render() {
    return (
      <LocaleReceiver componentName="TimePicker" defaultLocale={defaultLocale}>
        {this.renderTimePicker}
      </LocaleReceiver>
    );
  }
}
TimePicker.defaultProps = {
  prefixCls: 'ant-time-picker',
  align: {
    offset: [0, -2],
  },
  disabled: false,
  disabledHours: undefined,
  disabledMinutes: undefined,
  disabledSeconds: undefined,
  hideDisabledOptions: false,
  placement: 'bottomLeft',
  transitionName: 'slide-up',
  focusOnOpen: true,
};
polyfill(TimePicker);
export default TimePicker;
