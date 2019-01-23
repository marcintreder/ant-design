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
export default class Comment extends React.Component {
  constructor() {
    super(...arguments);
    this.renderNested = children => {
      const { prefixCls } = this.props;
      return <div className={classNames(`${prefixCls}-nested`)}>{children}</div>;
    };
  }
  getAction(actions) {
    if (!actions || !actions.length) {
      return null;
    }
    const actionList = actions.map((action, index) => <li key={`action-${index}`}>{action}</li>);
    return actionList;
  }
  render() {
    const _a = this.props,
      { actions, author, avatar, children, className, content, prefixCls, style, datetime } = _a,
      otherProps = __rest(_a, [
        'actions',
        'author',
        'avatar',
        'children',
        'className',
        'content',
        'prefixCls',
        'style',
        'datetime',
      ]);
    const avatarDom = (
      <div className={`${prefixCls}-avatar`}>
        {typeof avatar === 'string' ? <img src={avatar} /> : avatar}
      </div>
    );
    const actionDom =
      actions && actions.length ? (
        <ul className={`${prefixCls}-actions`}>{this.getAction(actions)}</ul>
      ) : null;
    const authorContent = (
      <div className={`${prefixCls}-content-author`}>
        {author && <span className={`${prefixCls}-content-author-name`}>{author}</span>}
        {datetime && <span className={`${prefixCls}-content-author-time`}>{datetime}</span>}
      </div>
    );
    const contentDom = (
      <div className={`${prefixCls}-content`}>
        {authorContent}
        <div className={`${prefixCls}-content-detail`}>{content}</div>
        {actionDom}
      </div>
    );
    const comment = (
      <div className={`${prefixCls}-inner`}>
        {avatarDom}
        {contentDom}
      </div>
    );
    return (
      <div {...otherProps} className={classNames(prefixCls, className)} style={style}>
        {comment}
        {children ? this.renderNested(children) : null}
      </div>
    );
  }
}
Comment.defaultProps = {
  prefixCls: 'ant-comment',
};
