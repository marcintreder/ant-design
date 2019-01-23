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
import * as PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import omit from 'omit.js';
import Checkbox from './Checkbox';
class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.toggleOption = option => {
      const optionIndex = this.state.value.indexOf(option.value);
      const value = [...this.state.value];
      if (optionIndex === -1) {
        value.push(option.value);
      } else {
        value.splice(optionIndex, 1);
      }
      if (!('value' in this.props)) {
        this.setState({ value });
      }
      const onChange = this.props.onChange;
      if (onChange) {
        onChange(value);
      }
    };
    this.state = {
      value: props.value || props.defaultValue || [],
    };
  }
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value || [],
      };
    }
    return null;
  }
  getChildContext() {
    return {
      checkboxGroup: {
        toggleOption: this.toggleOption,
        value: this.state.value,
        disabled: this.props.disabled,
      },
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }
  getOptions() {
    const { options } = this.props;
    // https://github.com/Microsoft/TypeScript/issues/7960
    return options.map(option => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });
  }
  render() {
    const { props, state } = this;
    const { prefixCls, className, style, options } = props,
      restProps = __rest(props, ['prefixCls', 'className', 'style', 'options']);
    const groupPrefixCls = `${prefixCls}-group`;
    const domProps = omit(restProps, ['children', 'defaultValue', 'value', 'onChange', 'disabled']);
    let children = props.children;
    if (options && options.length > 0) {
      children = this.getOptions().map(option => (
        <Checkbox
          prefixCls={prefixCls}
          key={option.value.toString()}
          disabled={'disabled' in option ? option.disabled : props.disabled}
          value={option.value}
          checked={state.value.indexOf(option.value) !== -1}
          onChange={option.onChange}
          className={`${groupPrefixCls}-item`}
        >
          {option.label}
        </Checkbox>
      ));
    }
    const classString = classNames(groupPrefixCls, className);
    return (
      <div className={classString} style={style} {...domProps}>
        {children}
      </div>
    );
  }
}
CheckboxGroup.defaultProps = {
  options: [],
  prefixCls: 'ant-checkbox',
};
CheckboxGroup.propTypes = {
  defaultValue: PropTypes.array,
  value: PropTypes.array,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};
CheckboxGroup.childContextTypes = {
  checkboxGroup: PropTypes.any,
};
polyfill(CheckboxGroup);
export default CheckboxGroup;
