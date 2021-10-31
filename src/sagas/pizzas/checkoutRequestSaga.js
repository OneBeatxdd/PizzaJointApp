import { put, takeLatest } from 'redux-saga/effects';
import { checkoutRequest, checkoutRequestFailure, checkoutRequestSuccess } from '../../actions/pizza';
import { globalRedirect } from '../../actions/system';
import { checkout } from '../../apiCalls/pizza';

function* checkoutRequestWorker({ payload }) {
  try {
    const response = yield checkout(payload.basket);
    yield put(checkoutRequestSuccess(response.data.data));
    payload.historyPush('/');
  } catch (e) {
    console.log(e);
    yield put(checkoutRequestFailure(e.response.data.error));
  }
}

export function* checkoutRequestSaga() {
  yield takeLatest(checkoutRequest().type, checkoutRequestWorker);
}
