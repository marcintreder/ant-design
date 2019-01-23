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
export default class TimelineItem extends React.Component {
  render() {
    const _a = this.props,
      { prefixCls, className, color = '', children, pending, dot } = _a,
      restProps = __rest(_a, ['prefixCls', 'className', 'color', 'children', 'pending', 'dot']);
    const itemClassName = classNames(
      {
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-item-pending`]: pending,
      },
      className,
    );
    const dotClassName = classNames({
      [`${prefixCls}-item-head`]: true,
      [`${prefixCls}-item-head-custom`]: dot,
      [`${prefixCls}-item-head-${color}`]: true,
    });
    return (
      <li {...restProps} className={itemClassName}>
        <div className={`${prefixCls}-item-tail`} />
        <div
          className={dotClassName}
          style={{ borderColor: /blue|red|green/.test(color) ? undefined : color }}
        >
          {dot}
        </div>
        <div className={`${prefixCls}-item-content`}>{children}</div>
      </li>
    );
  }
}
TimelineItem.defaultProps = {
  prefixCls: 'ant-timeline',
  color: 'blue',
  pending: false,
};
