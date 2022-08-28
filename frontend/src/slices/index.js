import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlices.js';
import loginReducer from './loginSlice.js';
import channelSlice from './channelSlice.js';

export default configureStore({
  reducer: {
    data: dataReducer,
    userCurrent: loginReducer,
    channels: channelSlice,
  },
});
console.log(configureStore({
  reducer: {
    data: dataReducer,
    userCurrent: loginReducer,
    channels: channelSlice,
  },
}).getState());
