import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import user from './user';

const reducers = combineReducers({
  user,
  session: sessionReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }
  return reducers(state, action);
};

export default rootReducer;
