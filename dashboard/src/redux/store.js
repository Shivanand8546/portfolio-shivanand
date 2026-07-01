import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import projectReducer from './slices/projectSlice'
import skillReducer from './slices/skillSlice'
import timelineReducer from './slices/timelineSlice'
import messageReducer from './slices/messageSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    skill: skillReducer,
    timeline: timelineReducer,
    message: messageReducer,
  }
})
export default store
