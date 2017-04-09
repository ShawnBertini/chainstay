'use strict';

import * as actions from '/app/actions/goalActions';
import goalsReducer from '/app/reducers/goals'
import deepFreeze from 'deep-freeze'

test( 'TEST ADD FIRST GOAL', () => {
  const startState = [];
  const action = actions.addGoal('My First Goal');
  const endState = [ { name: 'My First Goal', completed: false } ];

  deepFreeze(startState);
  deepFreeze(action);

  expect(
    goalsReducer( startState, action )
  ).toEqual(endState);
});

test( 'TEST REMOVE ONLY GOAL', () => {
  const startState = [ { name: 'My First Goal', completed: false } ];
  const action = actions.removeGoal('My First Goal');
  const endState = [];

    deepFreeze(startState);
    deepFreeze(action);

    expect(
      goalsReducer( startState, action )
    ).toEqual(endState);
});

test( 'TEST TOGGLE GOAL', () => {
  const startState = [ { name: 'My First Goal', completed: false } ];
  const action = actions.toggleGoal('My First Goal');
  const endState = [ { name: 'My First Goal', completed: true } ];

  deepFreeze(startState);
  deepFreeze(action);

  expect(
    goalsReducer( startState, action )
  ).toEqual(endState);
});
