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
import Input from './Input';
import Icon from '../icon';
import Button from '../button';
export default class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.onSearch = e => {
      const { onSearch } = this.props;
      if (onSearch) {
        onSearch(this.input.input.value, e);
      }
      this.input.focus();
    };
    this.saveInput = node => {
      this.input = node;
    };
  }
  focus() {
    this.input.focus();
  }
  blur() {
    this.input.blur();
  }
  getButtonOrIcon() {
    const { enterButton, prefixCls, size, disabled } = this.props;
    const enterButtonAsElement = enterButton;
    let node;
    if (!enterButton) {
      node = <Icon className={`${prefixCls}-icon`} type="search" key="searchIcon" />;
    } else if (enterButtonAsElement.type === Button || enterButtonAsElement.type === 'button') {
      node = React.cloneElement(
        enterButtonAsElement,
        enterButtonAsElement.type === Button
          ? {
              className: `${prefixCls}-button`,
              size,
            }
          : {},
      );
    } else {
      node = (
        <Button
          className={`${prefixCls}-button`}
          type="primary"
          size={size}
          disabled={disabled}
          key="enterButton"
        >
          {enterButton === true ? <Icon type="search" /> : enterButton}
        </Button>
      );
    }
    return React.cloneElement(node, {
      onClick: this.onSearch,
    });
  }
  render() {
    const _a = this.props,
      { className, prefixCls, inputPrefixCls, size, suffix, enterButton } = _a,
      others = __rest(_a, [
        'className',
        'prefixCls',
        'inputPrefixCls',
        'size',
        'suffix',
        'enterButton',
      ]);
    delete others.onSearch;
    const buttonOrIcon = this.getButtonOrIcon();
    let searchSuffix = suffix ? [suffix, buttonOrIcon] : buttonOrIcon;
    if (Array.isArray(searchSuffix)) {
      searchSuffix = searchSuffix.map((item, index) => {
        if (!React.isValidElement(item) || item.key) {
          return item;
        }
        return React.cloneElement(item, { key: index });
      });
    }
    const inputClassName = classNames(prefixCls, className, {
      [`${prefixCls}-enter-button`]: !!enterButton,
      [`${prefixCls}-${size}`]: !!size,
    });
    return (
      <Input
        onPressEnter={this.onSearch}
        {...others}
        size={size}
        className={inputClassName}
        prefixCls={inputPrefixCls}
        suffix={searchSuffix}
        ref={this.saveInput}
      />
    );
  }
}
Search.defaultProps = {
  inputPrefixCls: 'ant-input',
  prefixCls: 'ant-input-search',
  enterButton: false,
};
