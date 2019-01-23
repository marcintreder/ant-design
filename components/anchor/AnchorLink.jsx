import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
export default class AnchorLink extends React.Component {
  constructor() {
    super(...arguments);
    this.handleClick = e => {
      const { scrollTo, onClick } = this.context.antAnchor;
      const { href, title } = this.props;
      if (onClick) {
        onClick(e, { title, href });
      }
      scrollTo(href);
    };
  }
  componentDidMount() {
    this.context.antAnchor.registerLink(this.props.href);
  }
  componentWillReceiveProps(nextProps) {
    const { href } = nextProps;
    if (this.props.href !== href) {
      this.context.antAnchor.unregisterLink(this.props.href);
      this.context.antAnchor.registerLink(href);
    }
  }
  componentWillUnmount() {
    this.context.antAnchor.unregisterLink(this.props.href);
  }
  render() {
    const { prefixCls, href, title, children } = this.props;
    const active = this.context.antAnchor.activeLink === href;
    const wrapperClassName = classNames(`${prefixCls}-link`, {
      [`${prefixCls}-link-active`]: active,
    });
    const titleClassName = classNames(`${prefixCls}-link-title`, {
      [`${prefixCls}-link-title-active`]: active,
    });
    return (
      <div className={wrapperClassName}>
        <a
          className={titleClassName}
          href={href}
          title={typeof title === 'string' ? title : ''}
          onClick={this.handleClick}
        >
          {title}
        </a>
        {children}
      </div>
    );
  }
}
AnchorLink.defaultProps = {
  prefixCls: 'ant-anchor',
  href: '#',
};
AnchorLink.contextTypes = {
  antAnchor: PropTypes.object,
};
