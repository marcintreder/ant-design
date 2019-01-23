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
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';
import Icon from '../icon';
export default class InputNumber extends React.Component {
  render() {
    const _a = this.props,
      { className, size } = _a,
      others = __rest(_a, ['className', 'size']);
    const inputNumberClass = classNames(
      {
        [`${this.props.prefixCls}-lg`]: size === 'large',
        [`${this.props.prefixCls}-sm`]: size === 'small',
      },
      className,
    );
    const upIcon = <Icon type="up" className={`${this.props.prefixCls}-handler-up-inner`} />;
    const downIcon = <Icon type="down" className={`${this.props.prefixCls}-handler-down-inner`} />;
    return (
      <RcInputNumber
        ref={c => (this.inputNumberRef = c)}
        className={inputNumberClass}
        upHandler={upIcon}
        downHandler={downIcon}
        {...others}
      />
    );
  }
  focus() {
    this.inputNumberRef.focus();
  }
  blur() {
    this.inputNumberRef.blur();
  }
}
InputNumber.defaultProps = {
  prefixCls: 'ant-input-number',
  step: 1,
};
