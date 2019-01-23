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
import RcDrawer from 'rc-drawer';
import createReactContext from 'create-react-context';
import warning from 'warning';
import classNames from 'classnames';
import Icon from '../icon';
import { tuple } from '../_util/type';
const DrawerContext = createReactContext(null);
const PlacementTypes = tuple('top', 'right', 'bottom', 'left');
export default class Drawer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      push: false,
    };
    this.close = e => {
      if (this.props.visible !== undefined) {
        if (this.props.onClose) {
          this.props.onClose(e);
        }
        return;
      }
    };
    this.onMaskClick = e => {
      if (!this.props.maskClosable) {
        return;
      }
      this.close(e);
    };
    this.push = () => {
      this.setState({
        push: true,
      });
    };
    this.pull = () => {
      this.setState({
        push: false,
      });
    };
    this.onDestoryTransitionEnd = () => {
      const isDestroyOnClose = this.getDestoryOnClose();
      if (!isDestroyOnClose) {
        return;
      }
      if (!this.props.visible) {
        this.destoryClose = true;
        this.forceUpdate();
      }
    };
    this.getDestoryOnClose = () => this.props.destroyOnClose && !this.props.visible;
    // get drawar push width or height
    this.getPushTransform = placement => {
      if (placement === 'left' || placement === 'right') {
        return `translateX(${placement === 'left' ? 180 : -180}px)`;
      }
      if (placement === 'top' || placement === 'bottom') {
        return `translateY(${placement === 'top' ? 180 : -180}px)`;
      }
    };
    // render drawer body dom
    this.renderBody = () => {
      const { placement, prefixCls, visible } = this.props;
      if (this.destoryClose && !visible) {
        return null;
      }
      this.destoryClose = false;
      const containerStyle =
        placement === 'left' || placement === 'right'
          ? {
              overflow: 'auto',
              height: '100%',
            }
          : {};
      const isDestroyOnClose = this.getDestoryOnClose();
      if (isDestroyOnClose) {
        // Increase the opacity transition, delete children after closing.
        containerStyle.opacity = 0;
        containerStyle.transition = 'opacity .3s';
      }
      return (
        <div
          className={`${prefixCls}-wrapper-body`}
          style={containerStyle}
          onTransitionEnd={this.onDestoryTransitionEnd}
        >
          {this.renderHeader()}
          <div className={`${prefixCls}-body`}>{this.props.children}</div>
        </div>
      );
    };
    this.getRcDrawerStyle = () => {
      const { zIndex, placement, style } = this.props;
      const { push } = this.state;
      return Object.assign(
        { zIndex, transform: push ? this.getPushTransform(placement) : undefined },
        style,
      );
    };
    // render Provider for Multi-level drawe
    this.renderProvider = value => {
      const _a = this.props,
        { zIndex, style, placement, className, wrapClassName, width, height } = _a,
        rest = __rest(_a, [
          'zIndex',
          'style',
          'placement',
          'className',
          'wrapClassName',
          'width',
          'height',
        ]);
      warning(
        wrapClassName === undefined,
        'wrapClassName is deprecated, please use className instead.',
      );
      const haveMask = rest.mask ? '' : 'no-mask';
      this.parentDrawer = value;
      const offsetStyle = {};
      if (placement === 'left' || placement === 'right') {
        offsetStyle.width = width;
      } else {
        offsetStyle.height = height;
      }
      return (
        <DrawerContext.Provider value={this}>
          <RcDrawer
            handler={false}
            {...rest}
            {...offsetStyle}
            open={this.props.visible}
            onMaskClick={this.onMaskClick}
            showMask={this.props.mask}
            placement={placement}
            style={this.getRcDrawerStyle()}
            className={classNames(wrapClassName, className, haveMask)}
          >
            {this.renderBody()}
          </RcDrawer>
        </DrawerContext.Provider>
      );
    };
  }
  componentDidUpdate(preProps) {
    if (preProps.visible !== this.props.visible && this.parentDrawer) {
      if (this.props.visible) {
        this.parentDrawer.push();
      } else {
        this.parentDrawer.pull();
      }
    }
  }
  renderHeader() {
    const { prefixCls, title, closable } = this.props;
    if (!title && !closable) {
      return null;
    }
    return (
      <div className={`${prefixCls}-header`}>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        {this.renderCloseIcon()}
      </div>
    );
  }
  renderCloseIcon() {
    const { prefixCls, closable } = this.props;
    return (
      closable && (
        <button onClick={this.close} aria-label="Close" className={`${prefixCls}-close`}>
          <Icon type="close" />
        </button>
      )
    );
  }
  render() {
    return <DrawerContext.Consumer>{this.renderProvider}</DrawerContext.Consumer>;
  }
}
Drawer.propTypes = {
  closable: PropTypes.bool,
  destroyOnClose: PropTypes.bool,
  getContainer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
    PropTypes.bool,
  ]),
  maskClosable: PropTypes.bool,
  mask: PropTypes.bool,
  maskStyle: PropTypes.object,
  style: PropTypes.object,
  title: PropTypes.node,
  visible: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  zIndex: PropTypes.number,
  prefixCls: PropTypes.string,
  placement: PropTypes.oneOf(PlacementTypes),
  onClose: PropTypes.func,
  className: PropTypes.string,
};
Drawer.defaultProps = {
  prefixCls: 'ant-drawer',
  width: 256,
  height: 256,
  closable: true,
  placement: 'right',
  maskClosable: true,
  mask: true,
  level: null,
};
