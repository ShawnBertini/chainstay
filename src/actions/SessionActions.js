import * as actions from './ActionTypes';
//import _ from 'lodash';

export function loginComplete() {
  return {
    type: actions.LOGIN_COMPLETE,
  };
}

export function logoff() {
  return {
    type: actions.LOGOFF_COMPLETE,
  };
}

export function userLoaded(user) {
  return {
    type: actions.USER_LOADED,
    user: user
  };
}

export function userRemoved() {
  return {
    type: actions.USER_REMOVED
  }
}
