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
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import { ConfigConsumer } from '../config-provider';
import omit from 'omit.js';
import warning from 'warning';
import Icon from '../icon';
import { tuple } from '../_util/type';
const SelectSizes = tuple('default', 'large', 'small');
const SelectPropTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(SelectSizes),
  notFoundContent: PropTypes.any,
  showSearch: PropTypes.bool,
  optionLabelProp: PropTypes.string,
  transitionName: PropTypes.string,
  choiceTransitionName: PropTypes.string,
  id: PropTypes.string,
};
// => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };
export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.saveSelect = node => {
      this.rcSelect = node;
    };
    this.renderSelect = locale => {
      const _a = this.props,
        {
          prefixCls,
          className = '',
          size,
          mode,
          getPopupContainer,
          removeIcon,
          clearIcon,
          menuItemSelectedIcon,
        } = _a,
        restProps = __rest(_a, [
          'prefixCls',
          'className',
          'size',
          'mode',
          'getPopupContainer',
          'removeIcon',
          'clearIcon',
          'menuItemSelectedIcon',
        ]);
      const rest = omit(restProps, ['inputIcon']);
      const cls = classNames(
        {
          [`${prefixCls}-lg`]: size === 'large',
          [`${prefixCls}-sm`]: size === 'small',
        },
        className,
      );
      let { optionLabelProp } = this.props;
      if (this.isCombobox()) {
        // children 带 dom 结构时，无法填入输入框
        optionLabelProp = optionLabelProp || 'value';
      }
      const modeConfig = {
        multiple: mode === 'multiple',
        tags: mode === 'tags',
        combobox: this.isCombobox(),
      };
      const finalRemoveIcon = (removeIcon &&
        (React.isValidElement(removeIcon)
          ? React.cloneElement(removeIcon, {
              className: classNames(removeIcon.props.className, `${prefixCls}-remove-icon`),
            })
          : removeIcon)) || <Icon type="close" className={`${prefixCls}-remove-icon`} />;
      const finalClearIcon = (clearIcon &&
        (React.isValidElement(clearIcon)
          ? React.cloneElement(clearIcon, {
              className: classNames(clearIcon.props.className, `${prefixCls}-clear-icon`),
            })
          : clearIcon)) || (
        <Icon type="close-circle" theme="filled" className={`${prefixCls}-clear-icon`} />
      );
      const finalMenuItemSelectedIcon = (menuItemSelectedIcon &&
        (React.isValidElement(menuItemSelectedIcon)
          ? React.cloneElement(menuItemSelectedIcon, {
              className: classNames(
                menuItemSelectedIcon.props.className,
                `${prefixCls}-selected-icon`,
              ),
            })
          : menuItemSelectedIcon)) || (
        <Icon type="check" className={`${prefixCls}-selected-icon`} />
      );
      return (
        <ConfigConsumer>
          {({ getPopupContainer: getContextPopupContainer }) => {
            return (
              <RcSelect
                inputIcon={this.renderSuffixIcon()}
                removeIcon={finalRemoveIcon}
                clearIcon={finalClearIcon}
                menuItemSelectedIcon={finalMenuItemSelectedIcon}
                {...rest}
                {...modeConfig}
                prefixCls={prefixCls}
                className={cls}
                optionLabelProp={optionLabelProp || 'children'}
                notFoundContent={this.getNotFoundContent(locale)}
                getPopupContainer={getPopupContainer || getContextPopupContainer}
                ref={this.saveSelect}
              />
            );
          }}
        </ConfigConsumer>
      );
    };
    warning(
      props.mode !== 'combobox',
      'The combobox mode of Select is deprecated, ' +
        'it will be removed in next major version, ' +
        'please use AutoComplete instead',
    );
  }
  focus() {
    this.rcSelect.focus();
  }
  blur() {
    this.rcSelect.blur();
  }
  getNotFoundContent(locale) {
    const { notFoundContent } = this.props;
    if (this.isCombobox()) {
      // AutoComplete don't have notFoundContent defaultly
      return notFoundContent === undefined ? null : notFoundContent;
    }
    return notFoundContent === undefined ? locale.notFoundContent : notFoundContent;
  }
  isCombobox() {
    const { mode } = this.props;
    return mode === 'combobox' || mode === Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;
  }
  renderSuffixIcon() {
    const { prefixCls, loading, suffixIcon } = this.props;
    if (suffixIcon) {
      return React.isValidElement(suffixIcon)
        ? React.cloneElement(suffixIcon, {
            className: classNames(suffixIcon.props.className, `${prefixCls}-arrow-icon`),
          })
        : suffixIcon;
    }
    if (loading) {
      return <Icon type="loading" />;
    }
    return <Icon type="down" className={`${prefixCls}-arrow-icon`} />;
  }
  render() {
    return (
      <LocaleReceiver componentName="Select" defaultLocale={defaultLocale.Select}>
        {this.renderSelect}
      </LocaleReceiver>
    );
  }
}
Select.Option = Option;
Select.OptGroup = OptGroup;
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
Select.defaultProps = {
  prefixCls: 'ant-select',
  showSearch: false,
  transitionName: 'slide-up',
  choiceTransitionName: 'zoom',
};
Select.propTypes = SelectPropTypes;
