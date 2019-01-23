import * as React from 'react';
export default props => (
  <div className={props.className} onClick={e => e.stopPropagation()}>
    {props.children}
  </div>
);
