const createStore = (reducer, initialState) => {
  const subscribers = [];
  let currentState = initialState;

  return {
    getState: () => currentState,
    subscribe: fn => {
      subscribers.push(fn);
      fn(currentState);
    },
    dispatch: action => {
      currentState = reducer(currentState, action);
      subscribers.forEach(fn => fn(currentState));
    },
  };
};

const deepCopy = object => JSON.parse(JSON.stringify(object));

const reducer = (state, action) => {
  const newState = deepCopy(state);
  if (action.type === 'SET_TEXT') {
    console.log('SET_TEXT');
    newState.PageTitle = action.PageTitle;
    return newState;
  } else {
    return state;
  }
};


const state = {
  PageTitle: 'Initial state text',
};

const store = Object.freeze(createStore(reducer, state));

export default store;
