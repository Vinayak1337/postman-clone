import { all, call } from '@redux-saga/core/effects';
import requestSaga from '../Request/request.saga';

export default function* rootSaga() {
  yield all([call(requestSaga)]);
}
