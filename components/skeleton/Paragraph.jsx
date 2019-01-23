import * as React from 'react';
import classNames from 'classnames';
class Paragraph extends React.Component {
  getWidth(index) {
    const { width, rows = 2 } = this.props;
    if (Array.isArray(width)) {
      return width[index];
    }
    // last paragraph
    if (rows - 1 === index) {
      return width;
    }
    return undefined;
  }
  render() {
    const { prefixCls, className, style, rows } = this.props;
    const rowList = [...Array(rows)].map((_, index) => (
      <li key={index} style={{ width: this.getWidth(index) }} />
    ));
    return (
      <ul className={classNames(prefixCls, className)} style={style}>
        {rowList}
      </ul>
    );
  }
}
Paragraph.defaultProps = {
  prefixCls: 'ant-skeleton-paragraph',
};
export default Paragraph;
