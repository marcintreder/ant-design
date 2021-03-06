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
import { polyfill } from 'react-lifecycles-compat';
import Tooltip from '../tooltip';
import Icon from '../icon';
import Button from '../button';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
class Popconfirm extends React.Component {
  constructor(props) {
    super(props);
    this.onConfirm = e => {
      this.setVisible(false, e);
      const { onConfirm } = this.props;
      if (onConfirm) {
        onConfirm.call(this, e);
      }
    };
    this.onCancel = e => {
      this.setVisible(false, e);
      const { onCancel } = this.props;
      if (onCancel) {
        onCancel.call(this, e);
      }
    };
    this.onVisibleChange = visible => {
      this.setVisible(visible);
    };
    this.saveTooltip = node => {
      this.tooltip = node;
    };
    this.renderOverlay = popconfirmLocale => {
      const {
        prefixCls,
        okButtonProps,
        cancelButtonProps,
        title,
        cancelText,
        okText,
        okType,
        icon,
      } = this.props;
      return (
        <div>
          <div className={`${prefixCls}-inner-content`}>
            <div className={`${prefixCls}-message`}>
              {icon}
              <div className={`${prefixCls}-message-title`}>{title}</div>
            </div>
            <div className={`${prefixCls}-buttons`}>
              <Button onClick={this.onCancel} size="small" {...cancelButtonProps}>
                {cancelText || popconfirmLocale.cancelText}
              </Button>
              <Button onClick={this.onConfirm} type={okType} size="small" {...okButtonProps}>
                {okText || popconfirmLocale.okText}
              </Button>
            </div>
          </div>
        </div>
      );
    };
    this.state = {
      visible: props.visible,
    };
  }
  static getDerivedStateFromProps(nextProps) {
    if ('visible' in nextProps) {
      return { visible: nextProps.visible };
    } else if ('defaultVisible' in nextProps) {
      return { visible: nextProps.defaultVisible };
    }
    return null;
  }
  getPopupDomNode() {
    return this.tooltip.getPopupDomNode();
  }
  setVisible(visible, e) {
    const props = this.props;
    if (!('visible' in props)) {
      this.setState({ visible });
    }
    const { onVisibleChange } = props;
    if (onVisibleChange) {
      onVisibleChange(visible, e);
    }
  }
  render() {
    const _a = this.props,
      { prefixCls, placement } = _a,
      restProps = __rest(_a, ['prefixCls', 'placement']);
    const overlay = (
      <LocaleReceiver componentName="Popconfirm" defaultLocale={defaultLocale.Popconfirm}>
        {this.renderOverlay}
      </LocaleReceiver>
    );
    return (
      <Tooltip
        {...restProps}
        prefixCls={prefixCls}
        placement={placement}
        onVisibleChange={this.onVisibleChange}
        visible={this.state.visible}
        overlay={overlay}
        ref={this.saveTooltip}
      />
    );
  }
}
Popconfirm.defaultProps = {
  prefixCls: 'ant-popover',
  transitionName: 'zoom-big',
  placement: 'top',
  trigger: 'click',
  okType: 'primary',
  icon: <Icon type="exclamation-circle" theme="filled" />,
};
polyfill(Popconfirm);
export default Popconfirm;
