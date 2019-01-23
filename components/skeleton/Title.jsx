import * as React from 'react';
import classNames from 'classnames';
class Title extends React.Component {
  render() {
    const { prefixCls, className, width, style } = this.props;
    return (
      <h3 className={classNames(prefixCls, className)} style={Object.assign({ width }, style)} />
    );
  }
}
Title.defaultProps = {
  prefixCls: 'ant-skeleton-title',
};
export default Title;
