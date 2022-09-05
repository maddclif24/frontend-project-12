/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import axios from 'axios';

import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import routes from '../routes.js';

export const loginUser = createAsyncThunk('user/loginUser', async (values) => {
  const { data } = await axios.post(routes.loginPath(), values);
  return data;
});

export const signupUser = createAsyncThunk('user/signupUser', async (values, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(routes.signupPath(), values);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const loginAdapter = createEntityAdapter();

const loginSlice = createSlice({
  name: 'user',
  // Добавляем в состояние отслеживание процесса загрузки
  // { ids: [], entities: {}, loading: 'idle', error: null }
  initialState: loginAdapter.getInitialState({ login: ' ', error: null }),
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.login = 'idle';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login = 'true';
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login = 'false';
        state.error = 'Invalid user';
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.login = 'false';
        state.error = action.payload;
        console.log(action);
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.login = 'true';
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
      });
  },
});
export const selectors = (state) => state.userCurrent.login;
export const { actions } = loginSlice;
export default loginSlice.reducer;
