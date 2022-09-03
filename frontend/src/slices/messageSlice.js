/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messageAdapter = createEntityAdapter();

// const initialState = { messages: [] };

const initialState = messageAdapter.getInitialState();

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessages: (state, actions) => {
      const { entities, ids } = actions.payload;
      state.entities = entities;
      state.ids = ids;
    },
    addNewMessage: messageAdapter.addOne,
  },
});
export const selectors = messageAdapter.getSelectors((state) => state.messages);
export const { actions } = messageSlice;
export default messageSlice.reducer;
