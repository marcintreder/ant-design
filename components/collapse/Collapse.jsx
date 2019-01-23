import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import animation from '../_util/openAnimation';
import CollapsePanel from './CollapsePanel';
import Icon from '../icon';
export default class Collapse extends React.Component {
  constructor() {
    super(...arguments);
    this.renderExpandIcon = () => {
      return <Icon type="right" className={`arrow`} />;
    };
  }
  render() {
    const { prefixCls, className = '', bordered } = this.props;
    const collapseClassName = classNames(
      {
        [`${prefixCls}-borderless`]: !bordered,
      },
      className,
    );
    return (
      <RcCollapse
        {...this.props}
        className={collapseClassName}
        expandIcon={this.renderExpandIcon}
      />
    );
  }
}
Collapse.Panel = CollapsePanel;
Collapse.defaultProps = {
  prefixCls: 'ant-collapse',
  bordered: true,
  openAnimation: Object.assign({}, animation, { appear() {} }),
};
