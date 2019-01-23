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
import { polyfill } from 'react-lifecycles-compat';
import Wave from '../_util/wave';
import Icon from '../icon';
import { tuple } from '../_util/type';
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
  return typeof str === 'string';
}
// Insert one space between two chinese characters automatically.
function insertSpace(child, needInserted) {
  // Check the child if is undefined or null.
  if (child == null) {
    return;
  }
  const SPACE = needInserted ? ' ' : '';
  // strictNullChecks oops.
  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar(child.props.children)
  ) {
    return React.cloneElement(child, {}, child.props.children.split('').join(SPACE));
  }
  if (typeof child === 'string') {
    if (isTwoCNChar(child)) {
      child = child.split('').join(SPACE);
    }
    return <span>{child}</span>;
  }
  return child;
}
const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'danger');
const ButtonShapes = tuple('circle', 'circle-outline');
const ButtonSizes = tuple('large', 'default', 'small');
const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.saveButtonRef = node => {
      this.buttonNode = node;
    };
    this.handleClick = e => {
      const { loading } = this.state;
      const { onClick } = this.props;
      if (!!loading) {
        return;
      }
      if (onClick) {
        onClick(e);
      }
    };
    this.state = {
      loading: props.loading,
      hasTwoCNChar: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loading instanceof Boolean) {
      return Object.assign({}, prevState, { loading: nextProps.loading });
    }
    return null;
  }
  componentDidMount() {
    this.fixTwoCNChar();
  }
  componentDidUpdate(prevProps) {
    this.fixTwoCNChar();
    if (prevProps.loading && typeof prevProps.loading !== 'boolean') {
      clearTimeout(this.delayTimeout);
    }
    const { loading } = this.props;
    if (loading && typeof loading !== 'boolean' && loading.delay) {
      this.delayTimeout = window.setTimeout(() => this.setState({ loading }), loading.delay);
    } else if (prevProps.loading === this.props.loading) {
      return;
    } else {
      this.setState({ loading });
    }
  }
  componentWillUnmount() {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }
  fixTwoCNChar() {
    // Fix for HOC usage like <FormatMessage />
    if (!this.buttonNode) {
      return;
    }
    const buttonText = this.buttonNode.textContent || this.buttonNode.innerText;
    if (this.isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!this.state.hasTwoCNChar) {
        this.setState({
          hasTwoCNChar: true,
        });
      }
    } else if (this.state.hasTwoCNChar) {
      this.setState({
        hasTwoCNChar: false,
      });
    }
  }
  isNeedInserted() {
    const { icon, children } = this.props;
    return React.Children.count(children) === 1 && !icon;
  }
  render() {
    const _a = this.props,
      {
        type,
        shape,
        size,
        className,
        children,
        icon,
        prefixCls,
        ghost,
        loading: _loadingProp,
        block,
      } = _a,
      rest = __rest(_a, [
        'type',
        'shape',
        'size',
        'className',
        'children',
        'icon',
        'prefixCls',
        'ghost',
        'loading',
        'block',
      ]);
    const { loading, hasTwoCNChar } = this.state;
    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
      default:
        break;
    }
    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && children !== 0 && icon,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-background-ghost`]: ghost,
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar,
      [`${prefixCls}-block`]: block,
    });
    const iconType = loading ? 'loading' : icon;
    const iconNode = iconType ? <Icon type={iconType} /> : null;
    const kids =
      children || children === 0
        ? React.Children.map(children, child => insertSpace(child, this.isNeedInserted()))
        : null;
    const linkButtonRestProps = rest;
    if (linkButtonRestProps.href !== undefined) {
      return (
        <a
          {...linkButtonRestProps}
          className={classes}
          onClick={this.handleClick}
          ref={this.saveButtonRef}
        >
          {iconNode}
          {kids}
        </a>
      );
    }
    // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
    const _b = rest,
      { htmlType } = _b,
      otherProps = __rest(_b, ['htmlType']);
    return (
      <Wave>
        <button
          {...otherProps}
          type={htmlType || 'button'}
          className={classes}
          onClick={this.handleClick}
          ref={this.saveButtonRef}
        >
          {iconNode}
          {kids}
        </button>
      </Wave>
    );
  }
}
Button.__ANT_BUTTON = true;
Button.defaultProps = {
  prefixCls: 'ant-btn',
  loading: false,
  ghost: false,
  block: false,
};
Button.propTypes = {
  type: PropTypes.string,
  shape: PropTypes.oneOf(ButtonShapes),
  size: PropTypes.oneOf(ButtonSizes),
  htmlType: PropTypes.oneOf(ButtonHTMLTypes),
  onClick: PropTypes.func,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  className: PropTypes.string,
  icon: PropTypes.string,
  block: PropTypes.bool,
};
polyfill(Button);
export default Button;
