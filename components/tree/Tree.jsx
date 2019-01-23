import * as React from 'react';
import RcTree, { TreeNode } from 'rc-tree';
import DirectoryTree from './DirectoryTree';
import classNames from 'classnames';
import animation from '../_util/openAnimation';
import Icon from '../icon';
export default class Tree extends React.Component {
  constructor() {
    super(...arguments);
    this.renderSwitcherIcon = ({ isLeaf, expanded, loading }) => {
      const { prefixCls, showLine } = this.props;
      if (loading) {
        return <Icon type="loading" className={`${prefixCls}-switcher-loading-icon`} />;
      }
      if (showLine) {
        if (isLeaf) {
          return <Icon type="file" className={`${prefixCls}-switcher-line-icon`} />;
        }
        return (
          <Icon
            type={expanded ? 'minus-square' : 'plus-square'}
            className={`${prefixCls}-switcher-line-icon`}
            theme="outlined"
          />
        );
      } else {
        if (isLeaf) {
          return null;
        }
        return <Icon type="caret-down" className={`${prefixCls}-switcher-icon`} theme="filled" />;
      }
    };
    this.setTreeRef = node => {
      this.tree = node;
    };
  }
  render() {
    const props = this.props;
    const { prefixCls, className, showIcon } = props;
    const checkable = props.checkable;
    return (
      <RcTree
        ref={this.setTreeRef}
        {...props}
        className={classNames(!showIcon && `${prefixCls}-icon-hide`, className)}
        checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`} /> : checkable}
        switcherIcon={this.renderSwitcherIcon}
      >
        {this.props.children}
      </RcTree>
    );
  }
}
Tree.TreeNode = TreeNode;
Tree.DirectoryTree = DirectoryTree;
Tree.defaultProps = {
  prefixCls: 'ant-tree',
  checkable: false,
  showIcon: false,
  openAnimation: Object.assign({}, animation, { appear: null }),
};
