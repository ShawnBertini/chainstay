import * as actions from './actionTypes';
//import _ from 'lodash';

export function addGoal(goal) {
  return {
    type: actions.ADD_GOAL,
    goal: goal
  };
}

export function updateGoal(goal) {
  return {
    type: actions.UPDATE_GOAL,
    goal: goal
  };
}

export function rehydrateGoal(goal) {
  return {
    type: actions.REHYDRATE_GOAL,
    goal: goal
  };
}

export function removeGoal(id) {
  return {
    type: actions.REMOVE_GOAL,
    id: id
  };
}

export function removeAllGoals() {
  return {
    type: actions.REMOVE_ALL_GOALS,
  }
}
