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
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import Spin from '../spin';
import Pagination from '../pagination';
import { Row } from '../grid';
import Item from './Item';
export default class List extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      paginationCurrent: 1,
    };
    this.defaultPaginationProps = {
      current: 1,
      pageSize: 10,
      onChange: (page, pageSize) => {
        const { pagination } = this.props;
        this.setState({
          paginationCurrent: page,
        });
        if (pagination && pagination.onChange) {
          pagination.onChange(page, pageSize);
        }
      },
      total: 0,
    };
    this.keys = {};
    this.renderItem = (item, index) => {
      const { dataSource, renderItem, rowKey } = this.props;
      let key;
      if (typeof rowKey === 'function') {
        key = rowKey(dataSource[index]);
      } else if (typeof rowKey === 'string') {
        key = dataSource[rowKey];
      } else {
        key = dataSource.key;
      }
      if (!key) {
        key = `list-item-${index}`;
      }
      this.keys[index] = key;
      return renderItem(item, index);
    };
    this.renderEmpty = contextLocale => {
      const locale = Object.assign({}, contextLocale, this.props.locale);
      return <div className={`${this.props.prefixCls}-empty-text`}>{locale.emptyText}</div>;
    };
  }
  getChildContext() {
    return {
      grid: this.props.grid,
    };
  }
  isSomethingAfterLastItem() {
    const { loadMore, pagination, footer } = this.props;
    return !!(loadMore || pagination || footer);
  }
  render() {
    const { paginationCurrent } = this.state;
    const _a = this.props,
      {
        bordered,
        split,
        className,
        children,
        itemLayout,
        loadMore,
        pagination,
        prefixCls,
        grid,
        dataSource,
        size,
        rowKey,
        renderItem,
        header,
        footer,
        loading,
        locale,
      } = _a,
      rest = __rest(_a, [
        'bordered',
        'split',
        'className',
        'children',
        'itemLayout',
        'loadMore',
        'pagination',
        'prefixCls',
        'grid',
        'dataSource',
        'size',
        'rowKey',
        'renderItem',
        'header',
        'footer',
        'loading',
        'locale',
      ]);
    let loadingProp = loading;
    if (typeof loadingProp === 'boolean') {
      loadingProp = {
        spinning: loadingProp,
      };
    }
    const isLoading = loadingProp && loadingProp.spinning;
    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
      default:
        break;
    }
    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-vertical`]: itemLayout === 'vertical',
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-split`]: split,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-loading`]: isLoading,
      [`${prefixCls}-grid`]: grid,
      [`${prefixCls}-something-after-last-item`]: this.isSomethingAfterLastItem(),
    });
    const paginationProps = Object.assign(
      {},
      this.defaultPaginationProps,
      { total: dataSource.length, current: paginationCurrent },
      pagination || {},
    );
    const largestPage = Math.ceil(paginationProps.total / paginationProps.pageSize);
    if (paginationProps.current > largestPage) {
      paginationProps.current = largestPage;
    }
    const paginationContent = pagination ? (
      <div className={`${prefixCls}-pagination`}>
        <Pagination {...paginationProps} onChange={this.defaultPaginationProps.onChange} />
      </div>
    ) : null;
    let splitDataSource = [...dataSource];
    if (pagination) {
      if (dataSource.length > (paginationProps.current - 1) * paginationProps.pageSize) {
        splitDataSource = [...dataSource].splice(
          (paginationProps.current - 1) * paginationProps.pageSize,
          paginationProps.pageSize,
        );
      }
    }
    let childrenContent;
    childrenContent = isLoading && <div style={{ minHeight: 53 }} />;
    if (splitDataSource.length > 0) {
      const items = splitDataSource.map((item, index) => this.renderItem(item, index));
      const childrenList = [];
      React.Children.forEach(items, (child, index) => {
        childrenList.push(
          React.cloneElement(child, {
            key: this.keys[index],
          }),
        );
      });
      childrenContent = grid ? <Row gutter={grid.gutter}>{childrenList}</Row> : childrenList;
    } else if (!children && !isLoading) {
      childrenContent = (
        <LocaleReceiver componentName="Table" defaultLocale={defaultLocale.Table}>
          {this.renderEmpty}
        </LocaleReceiver>
      );
    }
    const paginationPosition = paginationProps.position || 'bottom';
    return (
      <div className={classString} {...rest}>
        {(paginationPosition === 'top' || paginationPosition === 'both') && paginationContent}
        {header && <div className={`${prefixCls}-header`}>{header}</div>}
        <Spin {...loadingProp}>
          {childrenContent}
          {children}
        </Spin>
        {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
        {loadMore ||
          ((paginationPosition === 'bottom' || paginationPosition === 'both') && paginationContent)}
      </div>
    );
  }
}
List.Item = Item;
List.childContextTypes = {
  grid: PropTypes.any,
};
List.defaultProps = {
  dataSource: [],
  prefixCls: 'ant-list',
  bordered: false,
  split: true,
  loading: false,
  pagination: false,
};
