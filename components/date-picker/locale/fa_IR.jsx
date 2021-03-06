import CalendarLocale from 'rc-calendar/lib/locale/fa_IR';
import TimePickerLocale from '../../time-picker/locale/fa_IR';
// Merge into a locale object
const locale = {
  lang: Object.assign(
    { placeholder: 'انتخاب تاریخ', rangePlaceholder: ['تاریخ شروع', 'تاریخ پایان'] },
    CalendarLocale,
  ),
  timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
export default locale;
