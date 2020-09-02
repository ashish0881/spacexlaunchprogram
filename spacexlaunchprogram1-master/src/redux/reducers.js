import { REQUEST_SPACE,  RECEIVE_SPACE, RECEIVE_FILTER_SPACE_LIST } from './actions';

function apps( state = {isFetching: false, spaces: []}, action) {
  switch (action.type) {
    case REQUEST_SPACE:
      state = {
        ...state,
        isFetching: true
      };
      break;
    case RECEIVE_SPACE:
      state = {
        ...state,
        isFetching: false,
        spaces: action.spaces
      };
      break;
    case RECEIVE_FILTER_SPACE_LIST:
      state = {
        ...state,
        spaceListYear: action.payload
      };
      break;
  }
  return state
}

export default apps
