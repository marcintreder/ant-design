import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import interopDefault from '../_util/interopDefault';
import { changeConfirmLocale } from '../modal/locale';
function setMomentLocale(locale) {
  if (locale && locale.locale) {
    interopDefault(moment).locale(locale.locale);
  } else {
    interopDefault(moment).locale('en');
  }
}
export default class LocaleProvider extends React.Component {
  constructor(props) {
    super(props);
    setMomentLocale(props.locale);
    changeConfirmLocale(props.locale && props.locale.Modal);
  }
  getChildContext() {
    return {
      antLocale: Object.assign({}, this.props.locale, { exist: true }),
    };
  }
  componentDidUpdate(prevProps) {
    const { locale } = this.props;
    if (prevProps.locale !== locale) {
      setMomentLocale(locale);
    }
    changeConfirmLocale(locale && locale.Modal);
  }
  componentWillUnmount() {
    changeConfirmLocale();
  }
  render() {
    return React.Children.only(this.props.children);
  }
}
LocaleProvider.propTypes = {
  locale: PropTypes.object,
};
LocaleProvider.defaultProps = {
  locale: {},
};
LocaleProvider.childContextTypes = {
  antLocale: PropTypes.object,
};
