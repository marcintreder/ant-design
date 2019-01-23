import CalendarLocale from 'rc-calendar/lib/locale/th_TH';
import TimePickerLocale from '../../time-picker/locale/th_TH';
// Merge into a locale object
const locale = {
  lang: Object.assign(
    { placeholder: 'เลือกวันที่', rangePlaceholder: ['วันเริ่มต้น', 'วันสิ้นสุด'] },
    CalendarLocale,
  ),
  timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
export default locale;
