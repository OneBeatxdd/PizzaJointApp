import { put, takeLatest } from 'redux-saga/effects';
import { lastOrderListRequest, lastOrderListRequestFailure, lastOrderListRequestSuccess } from '../../actions/pizza';
import { getLastOrdered } from '../../apiCalls/pizza';

function* lastOrderListRequestWorker() {
  try {
    const response = yield getLastOrdered();
    yield put(lastOrderListRequestSuccess(response.data.data));
  } catch (e) {
    yield put(lastOrderListRequestFailure(e.response.data.error));
  }
}

export function* lastOrderListRequestSaga() {
  yield takeLatest(lastOrderListRequest().type, lastOrderListRequestWorker);
}
