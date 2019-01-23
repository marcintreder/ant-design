var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
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
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import omit from 'omit.js';
import Grid from './Grid';
import Meta from './Meta';
import Tabs from '../tabs';
import Row from '../row';
import Col from '../col';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';
import warning from '../_util/warning';
export default class Card extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      widerPadding: false,
    };
    this.updateWiderPaddingCalled = false;
    this.onTabChange = key => {
      if (this.props.onTabChange) {
        this.props.onTabChange(key);
      }
    };
    this.saveRef = node => {
      this.container = node;
    };
  }
  componentDidMount() {
    this.updateWiderPadding();
    this.resizeEvent = addEventListener(window, 'resize', this.updateWiderPadding);
    if ('noHovering' in this.props) {
      warning(
        !this.props.noHovering,
        '`noHovering` of Card is deprecated, you can remove it safely or use `hoverable` instead.',
      );
      warning(
        !!this.props.noHovering,
        '`noHovering={false}` of Card is deprecated, use `hoverable` instead.',
      );
    }
  }
  componentWillUnmount() {
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }
    this.updateWiderPadding.cancel();
  }
  updateWiderPadding() {
    if (!this.container) {
      return;
    }
    // 936 is a magic card width pixel number indicated by designer
    const WIDTH_BOUNDARY_PX = 936;
    if (this.container.offsetWidth >= WIDTH_BOUNDARY_PX && !this.state.widerPadding) {
      this.setState({ widerPadding: true }, () => {
        this.updateWiderPaddingCalled = true; // first render without css transition
      });
    }
    if (this.container.offsetWidth < WIDTH_BOUNDARY_PX && this.state.widerPadding) {
      this.setState({ widerPadding: false }, () => {
        this.updateWiderPaddingCalled = true; // first render without css transition
      });
    }
  }
  isContainGrid() {
    let containGrid;
    React.Children.forEach(this.props.children, element => {
      if (element && element.type && element.type === Grid) {
        containGrid = true;
      }
    });
    return containGrid;
  }
  getAction(actions) {
    if (!actions || !actions.length) {
      return null;
    }
    const actionList = actions.map((action, index) => (
      <li style={{ width: `${100 / actions.length}%` }} key={`action-${index}`}>
        <span>{action}</span>
      </li>
    ));
    return actionList;
  }
  // For 2.x compatible
  getCompatibleHoverable() {
    const { noHovering, hoverable } = this.props;
    if ('noHovering' in this.props) {
      return !noHovering || hoverable;
    }
    return !!hoverable;
  }
  render() {
    const _a = this.props,
      {
        prefixCls = 'ant-card',
        className,
        extra,
        headStyle = {},
        bodyStyle = {},
        noHovering,
        hoverable,
        title,
        loading,
        bordered = true,
        type,
        cover,
        actions,
        tabList,
        children,
        activeTabKey,
        defaultActiveTabKey,
      } = _a,
      others = __rest(_a, [
        'prefixCls',
        'className',
        'extra',
        'headStyle',
        'bodyStyle',
        'noHovering',
        'hoverable',
        'title',
        'loading',
        'bordered',
        'type',
        'cover',
        'actions',
        'tabList',
        'children',
        'activeTabKey',
        'defaultActiveTabKey',
      ]);
    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-hoverable`]: this.getCompatibleHoverable(),
      [`${prefixCls}-wider-padding`]: this.state.widerPadding,
      [`${prefixCls}-padding-transition`]: this.updateWiderPaddingCalled,
      [`${prefixCls}-contain-grid`]: this.isContainGrid(),
      [`${prefixCls}-contain-tabs`]: tabList && tabList.length,
      [`${prefixCls}-type-${type}`]: !!type,
    });
    const loadingBlockStyle =
      bodyStyle.padding === 0 || bodyStyle.padding === '0px' ? { padding: 24 } : undefined;
    const loadingBlock = (
      <div className={`${prefixCls}-loading-content`} style={loadingBlockStyle}>
        <Row gutter={8}>
          <Col span={22}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
          <Col span={15}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={6}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
          <Col span={18}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={13}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
          <Col span={9}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={4}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
          <Col span={3}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
          <Col span={16}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
          <Col span={6}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
          <Col span={8}>
            <div className={`${prefixCls}-loading-block`} />
          </Col>
        </Row>
      </div>
    );
    const hasActiveTabKey = activeTabKey !== undefined;
    const extraProps = {
      [hasActiveTabKey ? 'activeKey' : 'defaultActiveKey']: hasActiveTabKey
        ? activeTabKey
        : defaultActiveTabKey,
    };
    let head;
    const tabs =
      tabList && tabList.length ? (
        <Tabs
          {...extraProps}
          className={`${prefixCls}-head-tabs`}
          size="large"
          onChange={this.onTabChange}
        >
          {tabList.map(item => (
            <Tabs.TabPane tab={item.tab} disabled={item.disabled} key={item.key} />
          ))}
        </Tabs>
      ) : null;
    if (title || extra || tabs) {
      head = (
        <div className={`${prefixCls}-head`} style={headStyle}>
          <div className={`${prefixCls}-head-wrapper`}>
            {title && <div className={`${prefixCls}-head-title`}>{title}</div>}
            {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
          </div>
          {tabs}
        </div>
      );
    }
    const coverDom = cover ? <div className={`${prefixCls}-cover`}>{cover}</div> : null;
    const body = (
      <div className={`${prefixCls}-body`} style={bodyStyle}>
        {loading ? loadingBlock : children}
      </div>
    );
    const actionDom =
      actions && actions.length ? (
        <ul className={`${prefixCls}-actions`}>{this.getAction(actions)}</ul>
      ) : null;
    const divProps = omit(others, ['onTabChange']);
    return (
      <div {...divProps} className={classString} ref={this.saveRef}>
        {head}
        {coverDom}
        {body}
        {actionDom}
      </div>
    );
  }
}
Card.Grid = Grid;
Card.Meta = Meta;
__decorate([throttleByAnimationFrameDecorator()], Card.prototype, 'updateWiderPadding', null);
