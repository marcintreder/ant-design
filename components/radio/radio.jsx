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
import RcCheckbox from 'rc-checkbox';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
export default class Radio extends React.Component {
  constructor() {
    super(...arguments);
    this.saveCheckbox = node => {
      this.rcCheckbox = node;
    };
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context.radioGroup, nextContext.radioGroup)
    );
  }
  focus() {
    this.rcCheckbox.focus();
  }
  blur() {
    this.rcCheckbox.blur();
  }
  render() {
    const { props, context } = this;
    const { prefixCls, className, children, style } = props,
      restProps = __rest(props, ['prefixCls', 'className', 'children', 'style']);
    const { radioGroup } = context;
    const radioProps = Object.assign({}, restProps);
    if (radioGroup) {
      radioProps.name = radioGroup.name;
      radioProps.onChange = radioGroup.onChange;
      radioProps.checked = props.value === radioGroup.value;
      radioProps.disabled = props.disabled || radioGroup.disabled;
    }
    const wrapperClassString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    });
    return (
      <label
        className={wrapperClassString}
        style={style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <RcCheckbox {...radioProps} prefixCls={prefixCls} ref={this.saveCheckbox} />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
Radio.defaultProps = {
  prefixCls: 'ant-radio',
  type: 'radio',
};
Radio.contextTypes = {
  radioGroup: PropTypes.any,
};
