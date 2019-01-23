import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../icon';
import Dialog from './Modal';
import ActionButton from './ActionButton';
import { getConfirmLocale } from './locale';
const IS_REACT_16 = !!ReactDOM.createPortal;
const ConfirmDialog = props => {
  const {
    onCancel,
    onOk,
    close,
    zIndex,
    afterClose,
    visible,
    keyboard,
    centered,
    getContainer,
    maskStyle,
    okButtonProps,
    cancelButtonProps,
  } = props;
  const iconType = props.iconType || 'question-circle';
  const okType = props.okType || 'primary';
  const prefixCls = props.prefixCls || 'ant-modal';
  const contentPrefixCls = `${prefixCls}-confirm`;
  // 默认为 true，保持向下兼容
  const okCancel = 'okCancel' in props ? props.okCancel : true;
  const width = props.width || 416;
  const style = props.style || {};
  // 默认为 false，保持旧版默认行为
  const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
  const runtimeLocale = getConfirmLocale();
  const okText = props.okText || (okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
  const cancelText = props.cancelText || runtimeLocale.cancelText;
  const autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || 'ok';
  const classString = classNames(
    contentPrefixCls,
    `${contentPrefixCls}-${props.type}`,
    props.className,
  );
  const cancelButton = okCancel && (
    <ActionButton
      actionFn={onCancel}
      closeModal={close}
      autoFocus={autoFocusButton === 'cancel'}
      buttonProps={cancelButtonProps}
    >
      {cancelText}
    </ActionButton>
  );
  return (
    <Dialog
      prefixCls={prefixCls}
      className={classString}
      wrapClassName={classNames({ [`${contentPrefixCls}-centered`]: !!props.centered })}
      onCancel={close.bind(this, { triggerCancel: true })}
      visible={visible}
      title=""
      transitionName="zoom"
      footer=""
      maskTransitionName="fade"
      maskClosable={maskClosable}
      maskStyle={maskStyle}
      style={style}
      width={width}
      zIndex={zIndex}
      afterClose={afterClose}
      keyboard={keyboard}
      centered={centered}
      getContainer={getContainer}
    >
      <div className={`${contentPrefixCls}-body-wrapper`}>
        <div className={`${contentPrefixCls}-body`}>
          <Icon type={iconType} />
          <span className={`${contentPrefixCls}-title`}>{props.title}</span>
          <div className={`${contentPrefixCls}-content`}>{props.content}</div>
        </div>
        <div className={`${contentPrefixCls}-btns`}>
          {cancelButton}
          <ActionButton
            type={okType}
            actionFn={onOk}
            closeModal={close}
            autoFocus={autoFocusButton === 'ok'}
            buttonProps={okButtonProps}
          >
            {okText}
          </ActionButton>
        </div>
      </div>
    </Dialog>
  );
};
export default function confirm(config) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig = Object.assign({}, config, { close, visible: true });
  function close(...args) {
    currentConfig = Object.assign({}, currentConfig, {
      visible: false,
      afterClose: destroy.bind(this, ...args),
    });
    if (IS_REACT_16) {
      render(currentConfig);
    } else {
      destroy(...args);
    }
  }
  function update(newConfig) {
    currentConfig = Object.assign({}, currentConfig, newConfig);
    render(currentConfig);
  }
  function destroy(...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
  }
  function render(props) {
    ReactDOM.render(<ConfirmDialog {...props} />, div);
  }
  render(currentConfig);
  return {
    destroy: close,
    update,
  };
}
