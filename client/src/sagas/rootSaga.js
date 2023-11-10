
// import { all, call, put } from 'redux-saga/effects';
// import { takeLatest } from 'redux-saga/effects';


// function* loginSaga(action) {
//   try {
//     const user = yield call(api.login, action.payload);
//     yield put(loginSuccess(user));
//   } catch (error) {
//     yield put(loginFailure(error));
//   }
// }

// export function* loginWatcherSaga() {
//   yield takeLatest(loginActions.login.type, loginSaga);
// }

// export default function* rootSaga() {
//   yield all([
//     watchLogin(),
//   ]);
// }
