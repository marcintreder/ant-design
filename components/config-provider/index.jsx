import * as React from 'react';
import createReactContext from 'create-react-context';
const ConfigContext = createReactContext({});
const ConfigProvider = props => {
  const { getPopupContainer, children } = props;
  const config = {
    getPopupContainer,
  };
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};
export const ConfigConsumer = ConfigContext.Consumer;
export default ConfigProvider;
