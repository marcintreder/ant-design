import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import { tuple } from '../_util/type';
function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}
const InputSizes = tuple('small', 'default', 'large');
export default class Input extends React.Component {
  constructor() {
    super(...arguments);
    this.handleKeyDown = e => {
      const { onPressEnter, onKeyDown } = this.props;
      if (e.keyCode === 13 && onPressEnter) {
        onPressEnter(e);
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };
    this.saveInput = node => {
      this.input = node;
    };
  }
  focus() {
    this.input.focus();
  }
  blur() {
    this.input.blur();
  }
  select() {
    this.input.select();
  }
  getInputClassName() {
    const { prefixCls, size, disabled } = this.props;
    return classNames(prefixCls, {
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-disabled`]: disabled,
    });
  }
  renderLabeledInput(children) {
    const props = this.props;
    // Not wrap when there is not addons
    if (!props.addonBefore && !props.addonAfter) {
      return children;
    }
    const wrapperClassName = `${props.prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;
    const addonBefore = props.addonBefore ? (
      <span className={addonClassName}>{props.addonBefore}</span>
    ) : null;
    const addonAfter = props.addonAfter ? (
      <span className={addonClassName}>{props.addonAfter}</span>
    ) : null;
    const className = classNames(`${props.prefixCls}-wrapper`, {
      [wrapperClassName]: addonBefore || addonAfter,
    });
    const groupClassName = classNames(`${props.prefixCls}-group-wrapper`, {
      [`${props.prefixCls}-group-wrapper-sm`]: props.size === 'small',
      [`${props.prefixCls}-group-wrapper-lg`]: props.size === 'large',
    });
    // Need another wrapper for changing display:table to display:inline-block
    // and put style prop in wrapper
    return (
      <span className={groupClassName} style={props.style}>
        <span className={className}>
          {addonBefore}
          {React.cloneElement(children, { style: null })}
          {addonAfter}
        </span>
      </span>
    );
  }
  renderLabeledIcon(children) {
    const { props } = this;
    if (!('prefix' in props || 'suffix' in props)) {
      return children;
    }
    const prefix = props.prefix ? (
      <span className={`${props.prefixCls}-prefix`}>{props.prefix}</span>
    ) : null;
    const suffix = props.suffix ? (
      <span className={`${props.prefixCls}-suffix`}>{props.suffix}</span>
    ) : null;
    const affixWrapperCls = classNames(props.className, `${props.prefixCls}-affix-wrapper`, {
      [`${props.prefixCls}-affix-wrapper-sm`]: props.size === 'small',
      [`${props.prefixCls}-affix-wrapper-lg`]: props.size === 'large',
    });
    return (
      <span className={affixWrapperCls} style={props.style}>
        {prefix}
        {React.cloneElement(children, { style: null, className: this.getInputClassName() })}
        {suffix}
      </span>
    );
  }
  renderInput() {
    const { value, className } = this.props;
    // Fix https://fb.me/react-unknown-prop
    const otherProps = omit(this.props, [
      'prefixCls',
      'onPressEnter',
      'addonBefore',
      'addonAfter',
      'prefix',
      'suffix',
    ]);
    if ('value' in this.props) {
      otherProps.value = fixControlledValue(value);
      // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      delete otherProps.defaultValue;
    }
    return this.renderLabeledIcon(
      <input
        {...otherProps}
        className={classNames(this.getInputClassName(), className)}
        onKeyDown={this.handleKeyDown}
        ref={this.saveInput}
      />,
    );
  }
  render() {
    return this.renderLabeledInput(this.renderInput());
  }
}
Input.defaultProps = {
  prefixCls: 'ant-input',
  type: 'text',
  disabled: false,
};
Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.oneOf(InputSizes),
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  className: PropTypes.string,
  addonBefore: PropTypes.node,
  addonAfter: PropTypes.node,
  prefixCls: PropTypes.string,
  onPressEnter: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
};
