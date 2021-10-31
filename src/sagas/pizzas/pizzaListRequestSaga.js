import { put, takeLatest } from 'redux-saga/effects';
import { pizzaListRequest, pizzaListRequestFailure, pizzaListRequestSuccess } from '../../actions/pizza';
import { getPizzas } from '../../apiCalls/pizza';

function* pizzaListRequestWorker() {
  try {
    const response = yield getPizzas();
    yield put(pizzaListRequestSuccess(response.data.data));
  } catch (e) {
    yield put(pizzaListRequestFailure(e.response.data.error));
  }
}

export function* pizzaListRequestSaga() {
  yield takeLatest(pizzaListRequest().type, pizzaListRequestWorker);
}
