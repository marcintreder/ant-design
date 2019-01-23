import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SubMenu as RcSubMenu } from 'rc-menu';
import classNames from 'classnames';
class SubMenu extends React.Component {
  constructor() {
    super(...arguments);
    this.onKeyDown = e => {
      this.subMenu.onKeyDown(e);
    };
    this.saveSubMenu = subMenu => {
      this.subMenu = subMenu;
    };
  }
  render() {
    const { rootPrefixCls, className } = this.props;
    const theme = this.context.antdMenuTheme;
    return (
      <RcSubMenu
        {...this.props}
        ref={this.saveSubMenu}
        popupClassName={classNames(`${rootPrefixCls}-${theme}`, className)}
      />
    );
  }
}
SubMenu.contextTypes = {
  antdMenuTheme: PropTypes.string,
};
// fix issue:https://github.com/ant-design/ant-design/issues/8666
SubMenu.isSubMenu = 1;
export default SubMenu;
