/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannelId: null,
};

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setActiveChannelId: (state, actions) => {
      console.log(actions);
      state.activeChannelId = actions.payload;
    },
    switchActiveChannel: (state, actions) => {
      state.activeChannelId = actions.payload;
    },
  },
});
export const { actions } = viewSlice;
export default viewSlice.reducer;
