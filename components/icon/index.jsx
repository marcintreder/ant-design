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
import * as allIcons from '@ant-design/icons/lib/dist';
import ReactIcon from '@ant-design/icons-react';
import createFromIconfontCN from './IconFont';
import {
  svgBaseProps,
  withThemeSuffix,
  removeTypeTheme,
  getThemeFromTypeName,
  alias,
} from './utils';
import warning from '../_util/warning';
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';
// Initial setting
ReactIcon.add(...Object.keys(allIcons).map(key => allIcons[key]));
setTwoToneColor('#1890ff');
let defaultTheme = 'outlined';
let dangerousTheme = undefined;
const Icon = props => {
  const {
      // affect outter <i>...</i>
      className,
      // affect inner <svg>...</svg>
      type,
      component: Component,
      viewBox,
      spin,
      // children
      children,
      // other
      theme, // default to outlined
      twoToneColor,
    } = props,
    restProps = __rest(props, [
      'className',
      'type',
      'component',
      'viewBox',
      'spin',
      'children',
      'theme',
      'twoToneColor',
    ]);
  warning(
    Boolean(type || Component || children),
    'Icon should have `type` prop or `component` prop or `children`.',
  );
  const classString = classNames(
    {
      [`anticon`]: true,
      [`anticon-${type}`]: Boolean(type),
    },
    className,
  );
  const svgClassString = classNames({
    [`anticon-spin`]: !!spin || type === 'loading',
  });
  let innerNode;
  // component > children > type
  if (Component) {
    const innerSvgProps = Object.assign({}, svgBaseProps, { className: svgClassString, viewBox });
    if (!viewBox) {
      delete innerSvgProps.viewBox;
    }
    innerNode = <Component {...innerSvgProps}>{children}</Component>;
  }
  if (children) {
    warning(
      Boolean(viewBox) ||
        (React.Children.count(children) === 1 &&
          React.isValidElement(children) &&
          React.Children.only(children).type === 'use'),
      'Make sure that you provide correct `viewBox`' +
        ' prop (default `0 0 1024 1024`) to the icon.',
    );
    const innerSvgProps = Object.assign({}, svgBaseProps, { className: svgClassString });
    innerNode = (
      <svg {...innerSvgProps} viewBox={viewBox}>
        {children}
      </svg>
    );
  }
  if (typeof type === 'string') {
    let computedType = type;
    if (theme) {
      const themeInName = getThemeFromTypeName(type);
      warning(
        !themeInName || theme === themeInName,
        `The icon name '${type}' already specify a theme '${themeInName}',` +
          ` the 'theme' prop '${theme}' will be ignored.`,
      );
    }
    computedType = withThemeSuffix(
      removeTypeTheme(alias(computedType)),
      dangerousTheme || theme || defaultTheme,
    );
    innerNode = (
      <ReactIcon className={svgClassString} type={computedType} primaryColor={twoToneColor} />
    );
  }
  return (
    <i {...restProps} className={classString}>
      {innerNode}
    </i>
  );
};
function unstable_ChangeThemeOfIconsDangerously(theme) {
  warning(
    false,
    `You are using the unstable method 'Icon.unstable_ChangeThemeOfAllIconsDangerously', ` +
      `make sure that all the icons with theme '${theme}' display correctly.`,
  );
  dangerousTheme = theme;
}
function unstable_ChangeDefaultThemeOfIcons(theme) {
  warning(
    false,
    `You are using the unstable method 'Icon.unstable_ChangeDefaultThemeOfIcons', ` +
      `make sure that all the icons with theme '${theme}' display correctly.`,
  );
  defaultTheme = theme;
}
Icon.createFromIconfontCN = createFromIconfontCN;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
export default Icon;
