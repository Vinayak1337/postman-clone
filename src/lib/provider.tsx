'use client';

import { Provider } from 'react-redux';
import reduxStore from './redux';

const Providers = (props: React.PropsWithChildren) => (
  <Provider store={reduxStore}>{props.children}</Provider>
);

export default Providers;
