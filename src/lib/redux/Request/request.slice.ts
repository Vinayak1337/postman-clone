import { HttpMethod, Prisma } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Request = Prisma.RequestGetPayload<{}>;
type PartialRequest = Prisma.RequestGetPayload<{
  select: { id: true; url: true; method: true };
}>;

const initialState = {
  requests: {} as {
    [id: string]: Partial<Request> & PartialRequest;
  },
  selectedRequestId: '',
  response: {} as {
    [id: string]: Response;
  },
  selectedMeta: 'params' as 'params' | 'headers' | 'body',
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    fetchRequestsStart() {},
    fetchRequestsSuccess(
      state,
      action: PayloadAction<Prisma.RequestGetPayload<{}>[]>,
    ) {
      state.requests = action.payload.reduce((acc, request) => {
        acc[request.id] = request;
        return acc;
      }, {} as typeof state.requests);
      if (!state.selectedRequestId)
        state.selectedRequestId = Object.keys(state.requests).at(-1) || '';
    },
    setRequest(state, action: PayloadAction<Request>) {
      state.requests[action.payload.id] = action.payload;
    },
    deleteRequest(state, action: PayloadAction<string>) {
      delete state.requests[action.payload];
      if (state.selectedRequestId === action.payload)
        state.selectedRequestId = Object.keys(state.requests).at(-1) || '';
    },
    createRequestStart() {},
    createRequestSuccess(state, action: PayloadAction<Request>) {
      state.requests[action.payload.id] = action.payload;
      state.selectedRequestId = action.payload.id;
    },
    sendRequestStart(
      _,
      __: PayloadAction<{
        request: Request;
      }>,
    ) {},
    sendRequestSuccess(
      state,
      action: PayloadAction<{
        id: string;
        response: Response;
      }>,
    ) {
      state.response[action.payload.id] = action.payload.response;
    },
    selectRequest(state, action: PayloadAction<string>) {
      state.selectedRequestId = action.payload;
    },
    changeUrl(state, action: PayloadAction<string>) {
      state.requests[state.selectedRequestId].url = action.payload;
    },
    changeMethod(state, action: PayloadAction<HttpMethod>) {
      state.requests[state.selectedRequestId].method = action.payload;
    },
    changeBody(state, action: PayloadAction<string>) {
      state.requests[state.selectedRequestId].body = action.payload;
    },
    changeHeaders(state, action: PayloadAction<Prisma.JsonValue>) {
      state.requests[state.selectedRequestId].headers = action.payload;
    },
    changeParams(state, action: PayloadAction<Prisma.JsonValue>) {
      state.requests[state.selectedRequestId].params = action.payload;
    },
    selectMeta(state, action: PayloadAction<typeof initialState.selectedMeta>) {
      state.selectedMeta = action.payload;
    },
  },
});

export const {
  fetchRequestsStart,
  fetchRequestsSuccess,
  setRequest,
  deleteRequest,
  createRequestStart,
  createRequestSuccess,
  sendRequestStart,
  sendRequestSuccess,
  selectRequest,
  changeUrl,
  changeMethod,
  changeBody,
  changeHeaders,
  changeParams,
  selectMeta,
} = requestSlice.actions;

export default requestSlice.reducer;
