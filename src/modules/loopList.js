import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist';
import uuid from 'uuid/v4';

import loopsMockData from 'common/mocks/loops';

import { getLoopsData } from './modules';

import { STATUS_OPEN } from 'store/loops';

let loopsData = Object.keys(loopsMockData);

// Actions
const UPDATE_SEARCH_KEYWORDS = 'UPDATE_SEARCH_KEYWORDS';
const SEARCH_LOOPS = 'SEARCH_LOOPS';
export const ADD_LOOP = 'ADD_LOOP';

// Reducer
const searchKeywords = (state = '', action) => {
  switch (action.type) {
    case UPDATE_SEARCH_KEYWORDS:
      return action.keywords;
    default:
      return state;
  }
};

const ids = (state = loopsData, action) => {
  switch (action.type) {
    case SEARCH_LOOPS:
      return action.data;
    case ADD_LOOP:
      return [...state, action.data.id];
    case REHYDRATE:
      const rehydratedData =
        action.payload && action.payload.loops && action.payload.loops.data
          ? Object.keys(action.payload.loops.data)
          : state;
      return rehydratedData;
    default:
      return state;
  }
};

export default combineReducers({
  searchKeywords,
  ids
});

// Action Creators
export const updateSearchKeywords = keywords => ({
  type: UPDATE_SEARCH_KEYWORDS,
  keywords
});
export const searchLoops = () => (dispatch, getState) => {
  const state = getState();
  const keywords = getSearchKeywords(state.loopList);
  const loopsData = getLoopsData(state);
  const filteredLoopKeys = keywords
    ? Object.keys(loopsData).filter(id => {
        const loop = loopsData[id];
        return (
          loop.topic.toLowerCase().indexOf(keywords.toLowerCase()) > -1 ||
          loop.tags.filter(
            tag => tag.toLowerCase().indexOf(keywords.toLowerCase()) > -1
          ).length > 0
        );
      })
    : Object.keys(loopsData);
  dispatch({
    type: SEARCH_LOOPS,
    data: filteredLoopKeys
  });
};

export const addLoop = ({ topic, description, tags, username }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: ADD_LOOP,
    data: {
      id: uuid(),
      topic,
      description,
      tags,
      comments: [],
      status: STATUS_OPEN,
      username
    }
  });
};

// Getter
export const getSearchKeywords = state => state.searchKeywords;
export const getIds = state => state.ids;
