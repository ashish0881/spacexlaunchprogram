export const REQUEST_SPACE = 'REQUEST_SPACE'
export const RECEIVE_SPACE = 'RECEIVE_SPACE'
export const RECEIVE_FILTER_SPACE_LIST = 'RECEIVE_FILTER_SPACE_LIST'


function requestSpace() {
  return {
    type: REQUEST_SPACE
  }
}

function receiveSpace(json) {
  return {
    type: RECEIVE_SPACE,
    spaces: json
  }
}

function fetchSpaceList() {
  return dispatch => {
    dispatch(requestSpace())
    return fetch('https://api.spaceXdata.com/v3/launches?limit=100')
      .then(response => response.json())
      .then(json => dispatch(receiveSpace(json)))
  }
}

function shouldFetchList(state) {
  const spaces = state.spaces
  if (spaces.length==0) {
    return true
  } else if (state.isFetching) {
    return false
  }
}

function receiveFilterList(data){
  return{
    type: RECEIVE_FILTER_SPACE_LIST,
    payload: data
  }
}

export function fetchCompleteList() {
  return (dispatch, getState) => {
    if (shouldFetchList(getState())) {
      return dispatch(fetchSpaceList())
    }
  }
}

export function fetchSpaceListYearFilterAll(year, launch, land){
  return (dispatch) => {
    return fetch('https://api.spaceXdata.com/v3/launches?limit=100&launch_year='+year+'&launch_success='+launch+'&land_success='+land)
      .then(response => response.json())
      .then(json => dispatch(receiveFilterList(json)))
  }
}

export function fetchDetailsWithLaunch(data){
  return(dispatch) => {
    return fetch('https://api.spaceXdata.com/v3/launches?limit=100&launch_success='+data)
        .then(response => response.json())
        .then(json => dispatch(receiveFilterList(json)))
  }
}

export function fetchDetailsLandAndLaunch(launch, land){
  return(dispatch) => {
    return fetch('https://api.spaceXdata.com/v3/launches?limit=100&launch_success='+launch+'&land_success='+land)
        .then(response => response.json())
        .then(json => dispatch(receiveFilterList(json)))
  }
}
