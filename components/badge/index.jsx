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
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';
export default class Badge extends React.Component {
  getBadgeClassName() {
    const { prefixCls, className, status, children } = this.props;
    return classNames(className, prefixCls, {
      [`${prefixCls}-status`]: !!status,
      [`${prefixCls}-not-a-wrapper`]: !children,
    });
  }
  isZero() {
    const numberedDispayCount = this.getNumberedDispayCount();
    return numberedDispayCount === '0' || numberedDispayCount === 0;
  }
  isDot() {
    const { dot, status } = this.props;
    const isZero = this.isZero();
    return (dot && !isZero) || status;
  }
  isHidden() {
    const { showZero } = this.props;
    const displayCount = this.getDispayCount();
    const isZero = this.isZero();
    const isDot = this.isDot();
    const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
    return (isEmpty || (isZero && !showZero)) && !isDot;
  }
  getNumberedDispayCount() {
    const { count, overflowCount } = this.props;
    const displayCount = count > overflowCount ? `${overflowCount}+` : count;
    return displayCount;
  }
  getDispayCount() {
    const isDot = this.isDot();
    // dot mode don't need count
    if (isDot) {
      return '';
    }
    return this.getNumberedDispayCount();
  }
  getScrollNumberTitle() {
    const { title, count } = this.props;
    if (title) {
      return title;
    }
    return typeof count === 'string' || typeof count === 'number' ? count : undefined;
  }
  getStyleWithOffset() {
    const { offset, style } = this.props;
    return offset
      ? Object.assign({ right: -parseInt(offset[0], 10), marginTop: offset[1] }, style)
      : style;
  }
  renderStatusText() {
    const { prefixCls, text } = this.props;
    const hidden = this.isHidden();
    return hidden || !text ? null : <span className={`${prefixCls}-status-text`}>{text}</span>;
  }
  renderDispayComponent() {
    const { count } = this.props;
    const customNode = count;
    if (!customNode || typeof customNode !== 'object') {
      return undefined;
    }
    return React.cloneElement(customNode, {
      style: Object.assign(
        {},
        this.getStyleWithOffset(),
        customNode.props && customNode.props.style,
      ),
    });
  }
  renderBadgeNumber() {
    const { count, prefixCls, scrollNumberPrefixCls, status } = this.props;
    const displayCount = this.getDispayCount();
    const isDot = this.isDot();
    const hidden = this.isHidden();
    const scrollNumberCls = classNames({
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot,
      [`${prefixCls}-multiple-words`]:
        !isDot && count && count.toString && count.toString().length > 1,
      [`${prefixCls}-status-${status}`]: !!status,
    });
    return hidden ? null : (
      <ScrollNumber
        prefixCls={scrollNumberPrefixCls}
        data-show={!hidden}
        className={scrollNumberCls}
        count={displayCount}
        displayComponent={this.renderDispayComponent()} // <Badge status="success" count={<Icon type="xxx" />}></Badge>
        title={this.getScrollNumberTitle()}
        style={this.getStyleWithOffset()}
        key="scrollNumber"
      />
    );
  }
  render() {
    const _a = this.props,
      {
        count,
        showZero,
        prefixCls,
        scrollNumberPrefixCls,
        overflowCount,
        className,
        style,
        children,
        dot,
        status,
        text,
        offset,
        title,
      } = _a,
      restProps = __rest(_a, [
        'count',
        'showZero',
        'prefixCls',
        'scrollNumberPrefixCls',
        'overflowCount',
        'className',
        'style',
        'children',
        'dot',
        'status',
        'text',
        'offset',
        'title',
      ]);
    const scrollNumber = this.renderBadgeNumber();
    const statusText = this.renderStatusText();
    const statusCls = classNames({
      [`${prefixCls}-status-dot`]: !!status,
      [`${prefixCls}-status-${status}`]: !!status,
    });
    // <Badge status="success" />
    if (!children && status) {
      return (
        <span {...restProps} className={this.getBadgeClassName()} style={this.getStyleWithOffset()}>
          <span className={statusCls} />
          <span className={`${prefixCls}-status-text`}>{text}</span>
        </span>
      );
    }
    return (
      <span {...restProps} className={this.getBadgeClassName()}>
        {children}
        <Animate
          component=""
          showProp="data-show"
          transitionName={children ? `${prefixCls}-zoom` : ''}
          transitionAppear
        >
          {scrollNumber}
        </Animate>
        {statusText}
      </span>
    );
  }
}
Badge.defaultProps = {
  prefixCls: 'ant-badge',
  scrollNumberPrefixCls: 'ant-scroll-number',
  count: null,
  showZero: false,
  dot: false,
  overflowCount: 99,
};
Badge.propTypes = {
  count: PropTypes.node,
  showZero: PropTypes.bool,
  dot: PropTypes.bool,
  overflowCount: PropTypes.number,
};
