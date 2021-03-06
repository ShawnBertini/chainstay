'use strict';

import deepFreeze from 'deep-freeze'
import * as actions from '/src/actions/GoalActions';
import goalsReducer from '/src/reducers/Goals'

test( 'TEST ADD FIRST GOAL', () => {
  const startState = [];
  const action = actions.addGoal({ name: 'My First Goal'});
  const endState = [ { name: 'My First Goal'} ];

  deepFreeze(startState);
  deepFreeze(action);

  expect(
    goalsReducer( startState, action )
  ).toEqual(endState);
});

test( 'TEST REMOVE ONLY GOAL', () => {
  const startState = [ { id: 'abc123', name: 'My First Goal', completed: false } ];
  const action = actions.removeGoal('abc123');
  const endState = [];

    deepFreeze(startState);
    deepFreeze(action);

    expect(
      goalsReducer( startState, action )
    ).toEqual(endState);
});
