import Saga from 'redux-saga';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import reducer from './Root/root.reducer';
import rootSaga from './Root/root.saga';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const sagaMiddleware = Saga();

const middlewares: Middleware[] = [sagaMiddleware as Middleware];

if (process.env.NODE_ENV === 'development')
  middlewares.push(logger as Middleware);

const reduxStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(middlewares),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof reduxStore.getState>;
export type RootDispatch = typeof reduxStore.dispatch;

export const useRTKSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useRTKDispatch = useDispatch<RootDispatch>;

export default reduxStore;
