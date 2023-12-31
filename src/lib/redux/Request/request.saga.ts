import axios from 'axios';
import {
  createRequestStart,
  createRequestSuccess,
  deleteRequest,
  fetchRequestsStart,
  fetchRequestsSuccess,
} from './request.slice';
import { takeLatest, call, put, all } from '@redux-saga/core/effects';

// Workers
function* fetchRequests() {
  try {
    const { data, status } = yield axios(`/api/request`);

    // ! TOAST IMPLEMENTATION
    if (status !== 200) return;

    yield put(fetchRequestsSuccess(data));
  } catch (error) {
    console.error(error);
  }
}

function* handleDeleteRequest(action: ReturnType<typeof deleteRequest>) {
  try {
    yield axios.delete(`/api/request/${action.payload}`);
  } catch (error) {
    console.error(error);
  }
}

function* createRequest() {
  try {
    const { data, status } = yield axios.post(`/api/request`, {
      url: '',
      method: 'GET',
    });

    // ! TOAST IMPLEMENTATION
    if (status !== 201) return null;

    yield put(createRequestSuccess(data));
  } catch (error) {
    console.error(error);
  }
}

// Watchers
function* watchFetchRequests() {
  yield takeLatest(fetchRequestsStart.type, fetchRequests);
}

function* watchDeleteRequest() {
  yield takeLatest(deleteRequest.type, handleDeleteRequest);
}

function* watchCreateRequest() {
  yield takeLatest(createRequestStart.type, createRequest);
}

export default function* requestSaga() {
  yield all([
    call(watchFetchRequests),
    call(watchDeleteRequest),
    call(watchCreateRequest),
  ]);
}
