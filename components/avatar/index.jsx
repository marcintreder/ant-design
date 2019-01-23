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
import * as ReactDOM from 'react-dom';
import Icon from '../icon';
import classNames from 'classnames';
export default class Avatar extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      scale: 1,
      isImgExist: true,
    };
    this.setScale = () => {
      const childrenNode = this.avatarChildren;
      if (childrenNode) {
        const childrenWidth = childrenNode.offsetWidth;
        const avatarNode = ReactDOM.findDOMNode(this);
        const avatarWidth = avatarNode.getBoundingClientRect().width;
        // add 4px gap for each side to get better performance
        if (avatarWidth - 8 < childrenWidth) {
          this.setState({
            scale: (avatarWidth - 8) / childrenWidth,
          });
        } else {
          this.setState({
            scale: 1,
          });
        }
      }
    };
    this.handleImgLoadError = () => {
      const { onError } = this.props;
      const errorFlag = onError ? onError() : undefined;
      if (errorFlag !== false) {
        this.setState({ isImgExist: false });
      }
    };
  }
  componentDidMount() {
    this.setScale();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.children !== this.props.children ||
      (prevState.scale !== this.state.scale && this.state.scale === 1) ||
      prevState.isImgExist !== this.state.isImgExist
    ) {
      this.setScale();
    }
  }
  render() {
    const _a = this.props,
      { prefixCls, shape, size, src, srcSet, icon, className, alt } = _a,
      others = __rest(_a, [
        'prefixCls',
        'shape',
        'size',
        'src',
        'srcSet',
        'icon',
        'className',
        'alt',
      ]);
    const { isImgExist, scale } = this.state;
    const sizeCls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    });
    const classString = classNames(prefixCls, className, sizeCls, {
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-image`]: src && isImgExist,
      [`${prefixCls}-icon`]: icon,
    });
    const sizeStyle =
      typeof size === 'number'
        ? {
            width: size,
            height: size,
            lineHeight: `${size}px`,
            fontSize: icon ? size / 2 : 18,
          }
        : {};
    let children = this.props.children;
    if (src && isImgExist) {
      children = <img src={src} srcSet={srcSet} onError={this.handleImgLoadError} alt={alt} />;
    } else if (icon) {
      children = <Icon type={icon} />;
    } else {
      const childrenNode = this.avatarChildren;
      if (childrenNode || scale !== 1) {
        const transformString = `scale(${scale}) translateX(-50%)`;
        const childrenStyle = {
          msTransform: transformString,
          WebkitTransform: transformString,
          transform: transformString,
        };
        const sizeChildrenStyle =
          typeof size === 'number'
            ? {
                lineHeight: `${size}px`,
              }
            : {};
        children = (
          <span
            className={`${prefixCls}-string`}
            ref={span => (this.avatarChildren = span)}
            style={Object.assign({}, sizeChildrenStyle, childrenStyle)}
          >
            {children}
          </span>
        );
      } else {
        children = (
          <span className={`${prefixCls}-string`} ref={span => (this.avatarChildren = span)}>
            {children}
          </span>
        );
      }
    }
    return (
      <span {...others} style={Object.assign({}, sizeStyle, others.style)} className={classString}>
        {children}
      </span>
    );
  }
}
Avatar.defaultProps = {
  prefixCls: 'ant-avatar',
  shape: 'circle',
  size: 'default',
};
