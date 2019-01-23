import * as React from 'react';
import Checkbox from '../index';
import '../style/index.tsx';
export default function CheckboxMerge(props) {
  return (
    <div style={{ width: 'auto' }}>
      <Checkbox {...props}>{props.children}</Checkbox>
    </div>
  );
}
