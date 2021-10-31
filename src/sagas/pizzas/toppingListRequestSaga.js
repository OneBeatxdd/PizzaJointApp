import { put, takeLatest } from 'redux-saga/effects';
import { toppingListRequest, toppingListRequestFailure, toppingListRequestSuccess } from '../../actions/pizza';
import { getToppings } from '../../apiCalls/pizza';

function* toppingListRequestWorker() {
  try {
    const response = yield getToppings();
    yield put(toppingListRequestSuccess(response.data.data));
  } catch (e) {
    yield put(toppingListRequestFailure(e.response.data.error));
  }
}

export function* toppingListRequestSaga() {
  yield takeLatest(toppingListRequest().type, toppingListRequestWorker);
}
