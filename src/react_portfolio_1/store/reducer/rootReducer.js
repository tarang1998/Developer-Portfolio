import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
import terminalReducer from './terminalReducer'

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  terminal: terminalReducer,
});

export default rootReducer

