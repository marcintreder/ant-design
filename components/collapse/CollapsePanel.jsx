import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
export default class CollapsePanel extends React.Component {
  render() {
    const { prefixCls, className = '', showArrow = true } = this.props;
    const collapsePanelClassName = classNames(
      {
        [`${prefixCls}-no-arrow`]: !showArrow,
      },
      className,
    );
    return <RcCollapse.Panel {...this.props} className={collapsePanelClassName} />;
  }
}
