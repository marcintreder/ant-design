import * as React from 'react';
import * as moment from 'moment';
import { polyfill } from 'react-lifecycles-compat';
import Calendar from 'rc-calendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import classNames from 'classnames';
import Icon from '../icon';
import interopDefault from '../_util/interopDefault';
function formatValue(value, format) {
  return (value && value.format(format)) || '';
}
class WeekPicker extends React.Component {
  constructor(props) {
    super(props);
    this.weekDateRender = current => {
      const selectedValue = this.state.value;
      const { prefixCls, dateRender } = this.props;
      const dateNode = dateRender ? dateRender(current) : current.date();
      if (
        selectedValue &&
        current.year() === selectedValue.year() &&
        current.week() === selectedValue.week()
      ) {
        return (
          <div className={`${prefixCls}-selected-day`}>
            <div className={`${prefixCls}-date`}>{dateNode}</div>
          </div>
        );
      }
      return <div className={`${prefixCls}-date`}>{dateNode}</div>;
    };
    this.handleChange = value => {
      if (!('value' in this.props)) {
        this.setState({ value });
      }
      this.props.onChange(value, formatValue(value, this.props.format));
    };
    this.handleOpenChange = open => {
      const { onOpenChange } = this.props;
      if (!('open' in this.props)) {
        this.setState({ open });
      }
      if (onOpenChange) {
        onOpenChange(open);
      }
      if (!open) {
        this.focus();
      }
    };
    this.clearSelection = e => {
      e.preventDefault();
      e.stopPropagation();
      this.handleChange(null);
    };
    this.saveInput = node => {
      this.input = node;
    };
    const value = props.value || props.defaultValue;
    if (value && !interopDefault(moment).isMoment(value)) {
      throw new Error(
        'The value/defaultValue of DatePicker or MonthPicker must be ' +
          'a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value',
      );
    }
    this.state = {
      value,
      open: props.open,
    };
  }
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps || 'open' in nextProps) {
      const state = {};
      if ('value' in nextProps) {
        state.value = nextProps.value;
      }
      if ('open' in nextProps) {
        state.open = nextProps.open;
      }
      return state;
    }
    return null;
  }
  focus() {
    this.input.focus();
  }
  blur() {
    this.input.blur();
  }
  render() {
    const {
      prefixCls,
      className,
      disabled,
      pickerClass,
      popupStyle,
      pickerInputClass,
      format,
      allowClear,
      locale,
      localeCode,
      disabledDate,
      style,
      onFocus,
      onBlur,
      id,
      suffixIcon,
    } = this.props;
    const { open, value: pickerValue } = this.state;
    if (pickerValue && localeCode) {
      pickerValue.locale(localeCode);
    }
    const placeholder =
      'placeholder' in this.props ? this.props.placeholder : locale.lang.placeholder;
    const calendar = (
      <Calendar
        showWeekNumber
        dateRender={this.weekDateRender}
        prefixCls={prefixCls}
        format={format}
        locale={locale.lang}
        showDateInput={false}
        showToday={false}
        disabledDate={disabledDate}
      />
    );
    const clearIcon =
      !disabled && allowClear && this.state.value ? (
        <Icon
          type="close-circle"
          className={`${prefixCls}-picker-clear`}
          onClick={this.clearSelection}
          theme="filled"
        />
      ) : null;
    const inputIcon = (suffixIcon &&
      (React.isValidElement(suffixIcon) ? (
        React.cloneElement(suffixIcon, {
          className: classNames({
            [suffixIcon.props.className]: suffixIcon.props.className,
            [`${prefixCls}-picker-icon`]: true,
          }),
        })
      ) : (
        <span className={`${prefixCls}-picker-icon`}>{suffixIcon}</span>
      ))) || <Icon type="calendar" className={`${prefixCls}-picker-icon`} />;
    const input = ({ value }) => (
      <span style={{ display: 'inline-block', width: '100%' }}>
        <input
          ref={this.saveInput}
          disabled={disabled}
          readOnly
          value={(value && value.format(format)) || ''}
          placeholder={placeholder}
          className={pickerInputClass}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {clearIcon}
        {inputIcon}
      </span>
    );
    return (
      <span className={classNames(className, pickerClass)} style={style} id={id}>
        <RcDatePicker
          {...this.props}
          calendar={calendar}
          prefixCls={`${prefixCls}-picker-container`}
          value={pickerValue}
          onChange={this.handleChange}
          open={open}
          onOpenChange={this.handleOpenChange}
          style={popupStyle}
        >
          {input}
        </RcDatePicker>
      </span>
    );
  }
}
WeekPicker.defaultProps = {
  format: 'gggg-wo',
  allowClear: true,
};
polyfill(WeekPicker);
export default WeekPicker;
