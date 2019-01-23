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
import Animate from 'rc-animate';
import classNames from 'classnames';
import omit from 'omit.js';
import { polyfill } from 'react-lifecycles-compat';
import Icon from '../icon';
import CheckableTag from './CheckableTag';
import Wave from '../_util/wave';
const InnerTag = _a => {
  var { show } = _a,
    restProps = __rest(_a, ['show']);
  const divProps = omit(restProps, ['onClose', 'afterClose', 'color', 'visible', 'closable']);
  return <div {...divProps} />;
};
class Tag extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      visible: true,
    };
    this.handleIconClick = e => {
      this.setVisible(false, e);
    };
    this.animationEnd = () => {
      const { afterClose } = this.props;
      if (afterClose) {
        afterClose();
      }
    };
  }
  static getDerivedStateFromProps(nextProps) {
    if ('visible' in nextProps) {
      return {
        visible: nextProps.visible,
      };
    }
    return null;
  }
  setVisible(visible, e) {
    const { onClose } = this.props;
    if (onClose) {
      onClose(e);
    }
    if (e.defaultPrevented) {
      return;
    }
    if (!('visible' in this.props)) {
      this.setState({ visible });
    }
  }
  isPresetColor(color) {
    if (!color) {
      return false;
    }
    return /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(
      color,
    );
  }
  getTagStyle() {
    const { color, style } = this.props;
    const isPresetColor = this.isPresetColor(color);
    return Object.assign({ backgroundColor: color && !isPresetColor ? color : undefined }, style);
  }
  getTagClassName() {
    const { prefixCls, className, color } = this.props;
    const { visible } = this.state;
    const isPresetColor = this.isPresetColor(color);
    return classNames(
      prefixCls,
      {
        [`${prefixCls}-${color}`]: isPresetColor,
        [`${prefixCls}-has-color`]: color && !isPresetColor,
        [`${prefixCls}-hidden`]: !visible,
      },
      className,
    );
  }
  renderCloseIcon() {
    const { closable } = this.props;
    return closable ? <Icon type="close" onClick={this.handleIconClick} /> : null;
  }
  render() {
    const _a = this.props,
      { prefixCls, children } = _a,
      otherProps = __rest(_a, ['prefixCls', 'children']);
    const { visible } = this.state;
    return (
      <Wave>
        <Animate
          component=""
          showProp="show"
          transitionName={`${prefixCls}-zoom`}
          onEnd={this.animationEnd}
        >
          <InnerTag
            show={visible}
            {...otherProps}
            className={this.getTagClassName()}
            style={this.getTagStyle()}
          >
            {children}
            {this.renderCloseIcon()}
          </InnerTag>
        </Animate>
      </Wave>
    );
  }
}
Tag.CheckableTag = CheckableTag;
Tag.defaultProps = {
  prefixCls: 'ant-tag',
  closable: false,
};
polyfill(Tag);
export default Tag;
