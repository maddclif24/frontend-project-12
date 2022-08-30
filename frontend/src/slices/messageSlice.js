/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelAdapter = createEntityAdapter();

const initialState = { messages: [] };

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    getMessages: (state, actions) => {
      console.log(actions);
      const { payload } = actions;
      state.messages = [...payload];
    },
    addNewMessage: (state, actions) => {
      state.messages.push(actions.payload);
    },
  },
});
export const { actions } = messageSlice;
export default messageSlice.reducer;
