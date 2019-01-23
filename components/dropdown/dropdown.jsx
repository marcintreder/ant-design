import * as React from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import { ConfigConsumer } from '../config-provider';
import warning from '../_util/warning';
import Icon from '../icon';
import { tuple } from '../_util/type';
const Placements = tuple(
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
);
export default class Dropdown extends React.Component {
  constructor() {
    super(...arguments);
    this.renderDropDown = ({ getPopupContainer: getContextPopupContainer }) => {
      const {
        children,
        prefixCls,
        overlay: overlayElements,
        trigger,
        disabled,
        getPopupContainer,
      } = this.props;
      const child = React.Children.only(children);
      const overlay = React.Children.only(overlayElements);
      const dropdownTrigger = React.cloneElement(child, {
        className: classNames(child.props.className, `${prefixCls}-trigger`),
        disabled,
      });
      // menu cannot be selectable in dropdown defaultly
      // menu should be focusable in dropdown defaultly
      const { selectable = false, focusable = true } = overlay.props;
      const expandIcon = (
        <span className={`${prefixCls}-menu-submenu-arrow`}>
          <Icon type="right" className={`${prefixCls}-menu-submenu-arrow-icon`} />
        </span>
      );
      const fixedModeOverlay =
        typeof overlay.type === 'string'
          ? overlay
          : React.cloneElement(overlay, {
              mode: 'vertical',
              selectable,
              focusable,
              expandIcon,
            });
      const triggerActions = disabled ? [] : trigger;
      let alignPoint;
      if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
        alignPoint = true;
      }
      return (
        <RcDropdown
          alignPoint={alignPoint}
          {...this.props}
          getPopupContainer={getPopupContainer || getContextPopupContainer}
          transitionName={this.getTransitionName()}
          trigger={triggerActions}
          overlay={fixedModeOverlay}
        >
          {dropdownTrigger}
        </RcDropdown>
      );
    };
  }
  getTransitionName() {
    const { placement = '', transitionName } = this.props;
    if (transitionName !== undefined) {
      return transitionName;
    }
    if (placement.indexOf('top') >= 0) {
      return 'slide-down';
    }
    return 'slide-up';
  }
  componentDidMount() {
    const { overlay } = this.props;
    if (overlay) {
      const overlayProps = overlay.props;
      warning(
        !overlayProps.mode || overlayProps.mode === 'vertical',
        `mode="${overlayProps.mode}" is not supported for Dropdown\'s Menu.`,
      );
    }
  }
  render() {
    return <ConfigConsumer>{this.renderDropDown}</ConfigConsumer>;
  }
}
Dropdown.defaultProps = {
  prefixCls: 'ant-dropdown',
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1,
  placement: 'bottomLeft',
};
