'use strict';

import {AsyncStorage} from 'react-native'
import * as actions from '../actions/ActionTypes';

export default function session (user = {isLoggedIn:false}, action = {}) {

  switch (action.type) {
    case actions.LOGIN_COMPLETE:
      let loggedInUser = {...user, isLoggedIn: true};
      return loggedInUser;

    case actions.LOGOFF_COMPLETE:
      let loggedOutUser = {...user, isLoggedIn: false};
      return loggedOutUser;

    case actions.USER_LOADED:
      if (action.user) return action.user;
      return user;

    case actions.USER_REMOVED:
      return null;

    default:
      return user;
  }
}
