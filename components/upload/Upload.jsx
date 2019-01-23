import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import RcUpload from 'rc-upload';
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import UploadList from './UploadList';
import { T, fileToObject, genPercentAdd, getFileItem, removeFileItem } from './utils';
class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.onStart = file => {
      const targetItem = fileToObject(file);
      targetItem.status = 'uploading';
      const nextFileList = this.state.fileList.concat();
      const fileIndex = nextFileList.findIndex(({ uid }) => uid === targetItem.uid);
      if (fileIndex === -1) {
        nextFileList.push(targetItem);
      } else {
        nextFileList[fileIndex] = targetItem;
      }
      this.onChange({
        file: targetItem,
        fileList: nextFileList,
      });
      // fix ie progress
      if (!window.FormData) {
        this.autoUpdateProgress(0, targetItem);
      }
    };
    this.onSuccess = (response, file) => {
      this.clearProgressTimer();
      try {
        if (typeof response === 'string') {
          response = JSON.parse(response);
        }
      } catch (e) {
        /* do nothing */
      }
      const fileList = this.state.fileList;
      const targetItem = getFileItem(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }
      targetItem.status = 'done';
      targetItem.response = response;
      this.onChange({
        file: Object.assign({}, targetItem),
        fileList,
      });
    };
    this.onProgress = (e, file) => {
      const fileList = this.state.fileList;
      const targetItem = getFileItem(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }
      targetItem.percent = e.percent;
      this.onChange({
        event: e,
        file: Object.assign({}, targetItem),
        fileList: this.state.fileList,
      });
    };
    this.onError = (error, response, file) => {
      this.clearProgressTimer();
      const fileList = this.state.fileList;
      const targetItem = getFileItem(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }
      targetItem.error = error;
      targetItem.response = response;
      targetItem.status = 'error';
      this.onChange({
        file: Object.assign({}, targetItem),
        fileList,
      });
    };
    this.handleManualRemove = file => {
      this.upload.abort(file);
      file.status = 'removed'; // eslint-disable-line
      this.handleRemove(file);
    };
    this.onChange = info => {
      if (!('fileList' in this.props)) {
        this.setState({ fileList: info.fileList });
      }
      const { onChange } = this.props;
      if (onChange) {
        onChange(info);
      }
    };
    this.onFileDrop = e => {
      this.setState({
        dragState: e.type,
      });
    };
    this.beforeUpload = (file, fileList) => {
      if (!this.props.beforeUpload) {
        return true;
      }
      const result = this.props.beforeUpload(file, fileList);
      if (result === false) {
        this.onChange({
          file,
          fileList: uniqBy(
            this.state.fileList.concat(fileList.map(fileToObject)),
            item => item.uid,
          ),
        });
        return false;
      } else if (result && result.then) {
        return result;
      }
      return true;
    };
    this.saveUpload = node => {
      this.upload = node;
    };
    this.renderUploadList = locale => {
      const { showUploadList, listType, onPreview } = this.props;
      const { showRemoveIcon, showPreviewIcon } = showUploadList;
      return (
        <UploadList
          listType={listType}
          items={this.state.fileList}
          onPreview={onPreview}
          onRemove={this.handleManualRemove}
          showRemoveIcon={showRemoveIcon}
          showPreviewIcon={showPreviewIcon}
          locale={Object.assign({}, locale, this.props.locale)}
        />
      );
    };
    this.state = {
      fileList: props.fileList || props.defaultFileList || [],
      dragState: 'drop',
    };
  }
  static getDerivedStateFromProps(nextProps) {
    if ('fileList' in nextProps) {
      return {
        fileList: nextProps.fileList || [],
      };
    }
    return null;
  }
  componentWillUnmount() {
    this.clearProgressTimer();
  }
  autoUpdateProgress(_, file) {
    const getPercent = genPercentAdd();
    let curPercent = 0;
    this.clearProgressTimer();
    this.progressTimer = setInterval(() => {
      curPercent = getPercent(curPercent);
      this.onProgress(
        {
          percent: curPercent * 100,
        },
        file,
      );
    }, 200);
  }
  handleRemove(file) {
    const { onRemove } = this.props;
    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(ret => {
      // Prevent removing file
      if (ret === false) {
        return;
      }
      const removedFileList = removeFileItem(file, this.state.fileList);
      if (removedFileList) {
        this.onChange({
          file,
          fileList: removedFileList,
        });
      }
    });
  }
  clearProgressTimer() {
    clearInterval(this.progressTimer);
  }
  render() {
    const {
      prefixCls = '',
      className,
      showUploadList,
      listType,
      type,
      disabled,
      children,
    } = this.props;
    const rcUploadProps = Object.assign(
      {
        onStart: this.onStart,
        onError: this.onError,
        onProgress: this.onProgress,
        onSuccess: this.onSuccess,
      },
      this.props,
      { beforeUpload: this.beforeUpload },
    );
    delete rcUploadProps.className;
    const uploadList = showUploadList ? (
      <LocaleReceiver componentName="Upload" defaultLocale={defaultLocale.Upload}>
        {this.renderUploadList}
      </LocaleReceiver>
    ) : null;
    if (type === 'drag') {
      const dragCls = classNames(prefixCls, {
        [`${prefixCls}-drag`]: true,
        [`${prefixCls}-drag-uploading`]: this.state.fileList.some(
          file => file.status === 'uploading',
        ),
        [`${prefixCls}-drag-hover`]: this.state.dragState === 'dragover',
        [`${prefixCls}-disabled`]: disabled,
      });
      return (
        <span className={className}>
          <div
            className={dragCls}
            onDrop={this.onFileDrop}
            onDragOver={this.onFileDrop}
            onDragLeave={this.onFileDrop}
          >
            <RcUpload {...rcUploadProps} ref={this.saveUpload} className={`${prefixCls}-btn`}>
              <div className={`${prefixCls}-drag-container`}>{children}</div>
            </RcUpload>
          </div>
          {uploadList}
        </span>
      );
    }
    const uploadButtonCls = classNames(prefixCls, {
      [`${prefixCls}-select`]: true,
      [`${prefixCls}-select-${listType}`]: true,
      [`${prefixCls}-disabled`]: disabled,
    });
    const uploadButton = (
      <div className={uploadButtonCls} style={{ display: children ? '' : 'none' }}>
        <RcUpload {...rcUploadProps} ref={this.saveUpload} />
      </div>
    );
    if (listType === 'picture-card') {
      return (
        <span className={className}>
          {uploadList}
          {uploadButton}
        </span>
      );
    }
    return (
      <span className={className}>
        {uploadButton}
        {uploadList}
      </span>
    );
  }
}
Upload.defaultProps = {
  prefixCls: 'ant-upload',
  type: 'select',
  multiple: false,
  action: '',
  data: {},
  accept: '',
  beforeUpload: T,
  showUploadList: true,
  listType: 'text',
  className: '',
  disabled: false,
  supportServerRender: true,
};
polyfill(Upload);
export default Upload;
