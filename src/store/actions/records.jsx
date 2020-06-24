import {
  SET_RECORD,
  FETCH_RECORDS,
  DELETE_ONE_RECORD,
  CREATE_ONE_RECORD,
  UPDATE_ONE_RECORD,
} from "../actionTypes";
import { swapiApi, localStorageApi } from "@services";
export function fetchRecords() {
  return function (dispatch) {
    swapiApi(`people`).then((people) => {
      dispatch(fetchRecordsSuccess({ people }));
    });
    swapiApi(`starships`).then((starships) => {
      dispatch(fetchRecordsSuccess({ starships }));
    });
    swapiApi(`planets`).then((planets) => {
      dispatch(fetchRecordsSuccess({ planets }));
    });
  };
}
export function setRecord(payload) {
  return function (dispatch) {
    dispatch(setRecordSuccess(payload));
  };
}
export function deleteOneRecord(payload) {
  return function (dispatch) {
    dispatch(deleteOneRecordSuccess(payload));
  };
}
export function createOneRecord(payload) {
  return function (dispatch) {
    dispatch(createOneRecordSuccess(payload));
  };
}
export function updateOneRecord(payload) {
  return function (dispatch) {
    dispatch(updateOneRecordSuccess(payload));
  };
}
function fetchRecordsSuccess(payload) {
  return {
    type: FETCH_RECORDS,
    payload,
  };
}
function updateOneRecordSuccess(payload) {
  return {
    type: UPDATE_ONE_RECORD,
    payload,
  };
}
function createOneRecordSuccess(payload) {
  return {
    type: CREATE_ONE_RECORD,
    payload,
  };
}
// function getPeopleSuccess(payload) {
//   return {
//     type: GET_PEOPLE,
//     payload,
//   };
// }
function setRecordSuccess(payload) {
  return {
    type: SET_RECORD,
    payload,
  };
}
function deleteOneRecordSuccess(payload) {
  return {
    type: DELETE_ONE_RECORD,
    payload,
  };
}
