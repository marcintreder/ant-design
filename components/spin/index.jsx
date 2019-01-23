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
import classNames from 'classnames';
import omit from 'omit.js';
import { tuple } from '../_util/type';
const SpinSizes = tuple('small', 'default', 'large');
// Render indicator
let defaultIndicator = null;
function renderIndicator(props) {
  const { prefixCls, indicator } = props;
  const dotClassName = `${prefixCls}-dot`;
  if (React.isValidElement(indicator)) {
    return React.cloneElement(indicator, {
      className: classNames(indicator.props.className, dotClassName),
    });
  }
  if (React.isValidElement(defaultIndicator)) {
    return React.cloneElement(defaultIndicator, {
      className: classNames(defaultIndicator.props.className, dotClassName),
    });
  }
  return (
    <span className={classNames(dotClassName, `${prefixCls}-dot-spin`)}>
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
function shouldDelay(spinning, delay) {
  return !!spinning && !!delay && !isNaN(Number(delay));
}
class Spin extends React.Component {
  constructor(props) {
    super(props);
    this.delayUpdateSpinning = () => {
      const { spinning } = this.props;
      if (this.state.spinning !== spinning) {
        this.setState({ spinning });
      }
    };
    const { spinning, delay } = props;
    this.state = {
      spinning: spinning && !shouldDelay(spinning, delay),
    };
  }
  static setDefaultIndicator(indicator) {
    defaultIndicator = indicator;
  }
  isNestedPattern() {
    return !!(this.props && this.props.children);
  }
  componentWillUnmount() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }
  componentDidUpdate() {
    const currentSpinning = this.state.spinning;
    const spinning = this.props.spinning;
    if (currentSpinning === spinning) {
      return;
    }
    const { delay } = this.props;
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (currentSpinning && !spinning) {
      this.debounceTimeout = window.setTimeout(() => this.setState({ spinning }), 200);
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
    } else {
      if (shouldDelay(spinning, delay)) {
        if (this.delayTimeout) {
          clearTimeout(this.delayTimeout);
        }
        this.delayTimeout = window.setTimeout(this.delayUpdateSpinning, delay);
      } else {
        this.setState({ spinning });
      }
    }
  }
  render() {
    const _a = this.props,
      { className, size, prefixCls, tip, wrapperClassName, style } = _a,
      restProps = __rest(_a, [
        'className',
        'size',
        'prefixCls',
        'tip',
        'wrapperClassName',
        'style',
      ]);
    const { spinning } = this.state;
    const spinClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-spinning`]: spinning,
        [`${prefixCls}-show-text`]: !!tip,
      },
      className,
    );
    // fix https://fb.me/react-unknown-prop
    const divProps = omit(restProps, ['spinning', 'delay', 'indicator']);
    const spinElement = (
      <div {...divProps} style={style} className={spinClassName}>
        {renderIndicator(this.props)}
        {tip ? <div className={`${prefixCls}-text`}>{tip}</div> : null}
      </div>
    );
    if (this.isNestedPattern()) {
      const containerClassName = classNames(`${prefixCls}-container`, {
        [`${prefixCls}-blur`]: spinning,
      });
      return (
        <div {...divProps} className={classNames(`${prefixCls}-nested-loading`, wrapperClassName)}>
          {spinning && <div key="loading">{spinElement}</div>}
          <div className={containerClassName} key="container">
            {this.props.children}
          </div>
        </div>
      );
    }
    return spinElement;
  }
}
Spin.defaultProps = {
  prefixCls: 'ant-spin',
  spinning: true,
  size: 'default',
  wrapperClassName: '',
};
Spin.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  spinning: PropTypes.bool,
  size: PropTypes.oneOf(SpinSizes),
  wrapperClassName: PropTypes.string,
  indicator: PropTypes.element,
};
export default Spin;
