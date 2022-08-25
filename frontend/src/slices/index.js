import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlices.js';
import loginReducer from './loginSlice.js';

export default configureStore({
  reducer: {
    data: dataReducer,
    userCurrent: loginReducer,
  },
});
console.log(configureStore({
  reducer: {
    data: dataReducer,
    userCurrent: loginReducer,
  },
}).getState());
