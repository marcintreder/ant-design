import * as React from 'react';
import Button from '../index';
export default function ButtonMerge(props) {
  return <Button {...props}>{props.children}</Button>;
}
