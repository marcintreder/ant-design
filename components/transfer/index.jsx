import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import List from './list';
import Operation from './operation';
import Search from './search';
import warning from '../_util/warning';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
function noop() {}
export default class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.separatedDataSource = null;
    this.moveTo = direction => {
      const { targetKeys = [], dataSource = [], onChange } = this.props;
      const { sourceSelectedKeys, targetSelectedKeys } = this.state;
      const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
      // filter the disabled options
      const newMoveKeys = moveKeys.filter(
        key => !dataSource.some(data => !!(key === data.key && data.disabled)),
      );
      // move items to target box
      const newTargetKeys =
        direction === 'right'
          ? newMoveKeys.concat(targetKeys)
          : targetKeys.filter(targetKey => newMoveKeys.indexOf(targetKey) === -1);
      // empty checked keys
      const oppositeDirection = direction === 'right' ? 'left' : 'right';
      this.setState({
        [this.getSelectedKeysName(oppositeDirection)]: [],
      });
      this.handleSelectChange(oppositeDirection, []);
      if (onChange) {
        onChange(newTargetKeys, direction, newMoveKeys);
      }
    };
    this.moveToLeft = () => this.moveTo('left');
    this.moveToRight = () => this.moveTo('right');
    this.handleSelectAll = (direction, filteredDataSource, checkAll) => {
      const originalSelectedKeys = this.state[this.getSelectedKeysName(direction)] || [];
      const currentKeys = filteredDataSource.map(item => item.key);
      // Only operate current keys from original selected keys
      const newKeys1 = originalSelectedKeys.filter(key => currentKeys.indexOf(key) === -1);
      const newKeys2 = [...originalSelectedKeys];
      currentKeys.forEach(key => {
        if (newKeys2.indexOf(key) === -1) {
          newKeys2.push(key);
        }
      });
      const holder = checkAll ? newKeys1 : newKeys2;
      this.handleSelectChange(direction, holder);
      if (!this.props.selectedKeys) {
        this.setState({
          [this.getSelectedKeysName(direction)]: holder,
        });
      }
    };
    this.handleLeftSelectAll = (filteredDataSource, checkAll) =>
      this.handleSelectAll('left', filteredDataSource, checkAll);
    this.handleRightSelectAll = (filteredDataSource, checkAll) =>
      this.handleSelectAll('right', filteredDataSource, checkAll);
    this.handleFilter = (direction, e) => {
      const { onSearchChange, onSearch } = this.props;
      const value = e.target.value;
      this.setState({
        // add filter
        [`${direction}Filter`]: value,
      });
      if (onSearchChange) {
        warning(
          false,
          '`onSearchChange` in Transfer is deprecated. Please use `onSearch` instead.',
        );
        onSearchChange(direction, e);
      }
      if (onSearch) {
        onSearch(direction, value);
      }
    };
    this.handleLeftFilter = e => this.handleFilter('left', e);
    this.handleRightFilter = e => this.handleFilter('right', e);
    this.handleClear = direction => {
      const { onSearch } = this.props;
      this.setState({
        [`${direction}Filter`]: '',
      });
      if (onSearch) {
        onSearch(direction, '');
      }
    };
    this.handleLeftClear = () => this.handleClear('left');
    this.handleRightClear = () => this.handleClear('right');
    this.handleSelect = (direction, selectedItem, checked) => {
      const { sourceSelectedKeys, targetSelectedKeys } = this.state;
      const holder = direction === 'left' ? [...sourceSelectedKeys] : [...targetSelectedKeys];
      const index = holder.indexOf(selectedItem.key);
      if (index > -1) {
        holder.splice(index, 1);
      }
      if (checked) {
        holder.push(selectedItem.key);
      }
      this.handleSelectChange(direction, holder);
      if (!this.props.selectedKeys) {
        this.setState({
          [this.getSelectedKeysName(direction)]: holder,
        });
      }
    };
    this.handleLeftSelect = (selectedItem, checked) => {
      return this.handleSelect('left', selectedItem, checked);
    };
    this.handleRightSelect = (selectedItem, checked) => {
      return this.handleSelect('right', selectedItem, checked);
    };
    this.handleScroll = (direction, e) => {
      const { onScroll } = this.props;
      if (onScroll) {
        onScroll(direction, e);
      }
    };
    this.handleLeftScroll = e => this.handleScroll('left', e);
    this.handleRightScroll = e => this.handleScroll('right', e);
    this.getLocale = transferLocale => {
      // Keep old locale props still working.
      const oldLocale = {};
      if ('notFoundContent' in this.props) {
        oldLocale.notFoundContent = this.props.notFoundContent;
      }
      if ('searchPlaceholder' in this.props) {
        oldLocale.searchPlaceholder = this.props.searchPlaceholder;
      }
      return Object.assign({}, transferLocale, oldLocale, this.props.locale);
    };
    this.renderTransfer = transferLocale => {
      const {
        prefixCls = 'ant-transfer',
        className,
        disabled,
        operations = [],
        showSearch,
        body,
        footer,
        style,
        listStyle,
        operationStyle,
        filterOption,
        render,
        lazy,
      } = this.props;
      const locale = this.getLocale(transferLocale);
      const { leftFilter, rightFilter, sourceSelectedKeys, targetSelectedKeys } = this.state;
      const { leftDataSource, rightDataSource } = this.separateDataSource(this.props);
      const leftActive = targetSelectedKeys.length > 0;
      const rightActive = sourceSelectedKeys.length > 0;
      const cls = classNames(className, prefixCls, disabled && `${prefixCls}-disabled`);
      const titles = this.getTitles(locale);
      return (
        <div className={cls} style={style}>
          <List
            prefixCls={`${prefixCls}-list`}
            titleText={titles[0]}
            dataSource={leftDataSource}
            filter={leftFilter}
            filterOption={filterOption}
            style={listStyle}
            checkedKeys={sourceSelectedKeys}
            handleFilter={this.handleLeftFilter}
            handleClear={this.handleLeftClear}
            handleSelect={this.handleLeftSelect}
            handleSelectAll={this.handleLeftSelectAll}
            render={render}
            showSearch={showSearch}
            body={body}
            footer={footer}
            lazy={lazy}
            onScroll={this.handleLeftScroll}
            disabled={disabled}
            {...locale}
          />
          <Operation
            className={`${prefixCls}-operation`}
            rightActive={rightActive}
            rightArrowText={operations[0]}
            moveToRight={this.moveToRight}
            leftActive={leftActive}
            leftArrowText={operations[1]}
            moveToLeft={this.moveToLeft}
            style={operationStyle}
            disabled={disabled}
          />
          <List
            prefixCls={`${prefixCls}-list`}
            titleText={titles[1]}
            dataSource={rightDataSource}
            filter={rightFilter}
            filterOption={filterOption}
            style={listStyle}
            checkedKeys={targetSelectedKeys}
            handleFilter={this.handleRightFilter}
            handleClear={this.handleRightClear}
            handleSelect={this.handleRightSelect}
            handleSelectAll={this.handleRightSelectAll}
            render={render}
            showSearch={showSearch}
            body={body}
            footer={footer}
            lazy={lazy}
            onScroll={this.handleRightScroll}
            disabled={disabled}
            {...locale}
          />
        </div>
      );
    };
    warning(
      !('notFoundContent' in props || 'searchPlaceholder' in props),
      'Transfer[notFoundContent] and Transfer[searchPlaceholder] will be removed, ' +
        'please use Transfer[locale] instead.',
    );
    const { selectedKeys = [], targetKeys = [] } = props;
    this.state = {
      leftFilter: '',
      rightFilter: '',
      sourceSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) === -1),
      targetSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) > -1),
    };
  }
  componentWillReceiveProps(nextProps) {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    if (
      nextProps.targetKeys !== this.props.targetKeys ||
      nextProps.dataSource !== this.props.dataSource
    ) {
      // clear cached separated dataSource
      this.separatedDataSource = null;
      if (!nextProps.selectedKeys) {
        // clear key no longer existed
        // clear checkedKeys according to targetKeys
        const { dataSource, targetKeys = [] } = nextProps;
        const newSourceSelectedKeys = [];
        const newTargetSelectedKeys = [];
        dataSource.forEach(({ key }) => {
          if (sourceSelectedKeys.includes(key) && !targetKeys.includes(key)) {
            newSourceSelectedKeys.push(key);
          }
          if (targetSelectedKeys.includes(key) && targetKeys.includes(key)) {
            newTargetSelectedKeys.push(key);
          }
        });
        this.setState({
          sourceSelectedKeys: newSourceSelectedKeys,
          targetSelectedKeys: newTargetSelectedKeys,
        });
      }
    }
    if (nextProps.selectedKeys) {
      const targetKeys = nextProps.targetKeys || [];
      this.setState({
        sourceSelectedKeys: nextProps.selectedKeys.filter(key => !targetKeys.includes(key)),
        targetSelectedKeys: nextProps.selectedKeys.filter(key => targetKeys.includes(key)),
      });
    }
  }
  separateDataSource(props) {
    if (this.separatedDataSource) {
      return this.separatedDataSource;
    }
    const { dataSource, rowKey, targetKeys = [] } = props;
    const leftDataSource = [];
    const rightDataSource = new Array(targetKeys.length);
    dataSource.forEach(record => {
      if (rowKey) {
        record.key = rowKey(record);
      }
      // rightDataSource should be ordered by targetKeys
      // leftDataSource should be ordered by dataSource
      const indexOfKey = targetKeys.indexOf(record.key);
      if (indexOfKey !== -1) {
        rightDataSource[indexOfKey] = record;
      } else {
        leftDataSource.push(record);
      }
    });
    this.separatedDataSource = {
      leftDataSource,
      rightDataSource,
    };
    return this.separatedDataSource;
  }
  handleSelectChange(direction, holder) {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    const onSelectChange = this.props.onSelectChange;
    if (!onSelectChange) {
      return;
    }
    if (direction === 'left') {
      onSelectChange(holder, targetSelectedKeys);
    } else {
      onSelectChange(sourceSelectedKeys, holder);
    }
  }
  getTitles(transferLocale) {
    const { props } = this;
    if (props.titles) {
      return props.titles;
    }
    return transferLocale.titles;
  }
  getSelectedKeysName(direction) {
    return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
  }
  render() {
    return (
      <LocaleReceiver componentName="Transfer" defaultLocale={defaultLocale.Transfer}>
        {this.renderTransfer}
      </LocaleReceiver>
    );
  }
}
// For high-level customized Transfer @dqaria
Transfer.List = List;
Transfer.Operation = Operation;
Transfer.Search = Search;
Transfer.defaultProps = {
  dataSource: [],
  render: noop,
  locale: {},
  showSearch: false,
};
Transfer.propTypes = {
  prefixCls: PropTypes.string,
  disabled: PropTypes.bool,
  dataSource: PropTypes.array,
  render: PropTypes.func,
  targetKeys: PropTypes.array,
  onChange: PropTypes.func,
  height: PropTypes.number,
  style: PropTypes.object,
  listStyle: PropTypes.object,
  operationStyle: PropTypes.object,
  className: PropTypes.string,
  titles: PropTypes.array,
  operations: PropTypes.array,
  showSearch: PropTypes.bool,
  filterOption: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  notFoundContent: PropTypes.node,
  locale: PropTypes.object,
  body: PropTypes.func,
  footer: PropTypes.func,
  rowKey: PropTypes.func,
  lazy: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};
