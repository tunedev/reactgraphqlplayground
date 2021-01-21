import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import blogListReducer from './reducers/blogListReducer';
import userReducer from './reducers/usersReducer';
import notifyReducer from './reducers/notifyReducer';

const rootReducer = combineReducers({
  blogRelated: blogListReducer,
  userRelated: userReducer,
  notification: notifyReducer,
});

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
