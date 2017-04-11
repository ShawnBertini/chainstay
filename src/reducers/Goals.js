'use strict';

import {AsyncStorage} from 'react-native';
import shortid from 'shortid';
import * as actions from '../actions/ActionTypes';

export default function goals (goals = [], action = {}) {

  switch (action.type) {

    case actions.ADD_GOAL:
      return [ ...goals, action.goal ];

    case actions.UPDATE_GOAL:
      return goals.map( (goal) => {
        if ( goal.id === action.goal.id ) {
          return action.goal;
        }
        return goal;
      });

    case actions.REHYDRATE_GOAL:
      return [ ...goals, action.goal ];

    case actions.REMOVE_GOAL:
      let newGoalList = goals.filter( (elem) => {
        return elem.id !== action.id;
      });
      return newGoalList;

    case actions.REMOVE_ALL_GOALS:
      return [];

    default:
      return goals;
  }
}
