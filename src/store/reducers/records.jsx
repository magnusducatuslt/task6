import {
  SET_RECORD,
  FETCH_RECORDS,
  DELETE_ONE_RECORD,
  CREATE_ONE_RECORD,
  UPDATE_ONE_RECORD,
} from "../actionTypes";

const initialState = {
  people: [],
  starships: [],
  planets: [],
};

function recordsReducer(state = initialState, action) {
  let target = null;
  switch (action.type) {
    case FETCH_RECORDS:
      return { ...state, ...action.payload };
    case SET_RECORD:
      return { ...state, people: [].concat(...action.payload) };
    case DELETE_ONE_RECORD:
      target = [...state[action.payload.target]];
      target.splice(action.payload.index, 1);
      return { ...state, [action.payload.target]: [].concat(...target) };
    case CREATE_ONE_RECORD:
      target = [...state[action.payload.target], { ...action.payload.body }];
      return { ...state, [action.payload.target]: [].concat(...target) };
    case UPDATE_ONE_RECORD:
      target = [...state[action.payload.target]];
      const updatedElems = target.map((elem) => {
        if (elem.name === action.payload.body.name) {
          return action.payload.body;
        }
        return elem;
      });
      return { ...state, [action.payload.target]: [].concat(...updatedElems) };
    default:
      return { ...state };
  }
}

export default recordsReducer;
