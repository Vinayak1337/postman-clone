import axios, { Axios, AxiosResponse } from 'axios';
import {
  createRequestStart,
  createRequestSuccess,
  deleteRequest,
  fetchRequestsStart,
  fetchRequestsSuccess,
  sendRequestStart,
  sendRequestSuccess,
  updateRequestData,
} from './request.slice';
import { takeLatest, call, put, all } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';

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

function* sendRequest(action: ReturnType<typeof sendRequestStart>) {
  try {
    let { data, headers, status, statusText } = (yield axios({
      url: action.payload.url,
      method: action.payload.method,
      data: action.payload.body,
      headers: action.payload.headers?.map((header) => ({
        [header.key]: header.value,
      })) as any,
      params: action.payload.params?.map((param) => ({
        [param.key]: param.value,
      })) as any,
    })) as AxiosResponse;

    let serializedHeaders: { [x: string]: any } = {};

    for (let key of Object.keys(headers))
      if (typeof headers[key] === 'string')
        serializedHeaders[key] = headers[key];

    yield put(
      sendRequestSuccess({
        id: action.payload.id,
        response: {
          body: data,
          headers: serializedHeaders,
          status,
          statusText,
        },
      }),
    );

    const clonePayload = {
      id: action.payload.id,
      request: {
        url: action.payload.url,
        method: action.payload.method,
        body: action.payload.body,
        headers: action.payload.headers,
        params: action.payload.params,
      },
    };

    yield put(updateRequestData(clonePayload));
  } catch (error) {
    console.error(error);
  } finally {
    toast.dismiss('request-' + action.payload.id);
  }
}

function* updateRequest(action: ReturnType<typeof updateRequestData>) {
  try {
    yield axios.put(
      `/api/request/${action.payload.id}`,
      action.payload.request,
    );
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

function* watchSendRequest() {
  yield takeLatest(sendRequestStart.type, sendRequest);
}

function* watchUpdateRequest() {
  yield takeLatest(updateRequestData.type, updateRequest);
}

// Root Saga

export default function* requestSaga() {
  yield all([
    call(watchFetchRequests),
    call(watchDeleteRequest),
    call(watchCreateRequest),
    call(watchSendRequest),
    call(watchUpdateRequest),
  ]);
}
