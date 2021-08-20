import { combineReducers } from 'redux'
import choices from './choices'
import locked from './locked'
import room from './room'
import record from './record'
import now from './now'


const app = combineReducers({
  choices,
  locked,
  room,
  record,
  now,
})

export default app;
