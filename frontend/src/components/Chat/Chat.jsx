/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { normalize, schema } from 'normalizr';
import routes from '../../routes';
import useAuth from '../../hooks/index.jsx';

import { actions as channelActions } from '../../slices/channelSlice.js';
import { actions as viewActions } from '../../slices/viewSlice.js';
import { actions as messageSlice } from '../../slices/messageSlice.js';

import InputChat from './FormChat.jsx';
import Messeges from './Messeges.jsx';
import HeaderChannelList from './HeaderChannelList.jsx';
import ChannelList from './ChannelLIst.jsx';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const getNormalalized = (data) => {
    const shema = new schema.Entity('channels');

    const normalizedData = normalize(data, [shema]);

    return normalizedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { token } = JSON.parse(localStorage.getItem('user', 'token'));
      const { data } = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${token}` } });
      console.log(data);
      const normalizedData = getNormalalized(data.channels);
      const { channels } = normalizedData.entities;
      dispatch(channelActions.addChannels({ entities: channels, ids: Object.keys(channels) }));
      dispatch(viewActions.setActiveChannelId(data.currentChannelId));
      dispatch(messageSlice.getMessages(data.messages));
    };
    fetchData();
  }, []);

  return (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <ChannelList />
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          { /* <Title currentChannel={store} /> */ }
          <HeaderChannelList />
          <Messeges />
          <InputChat />
        </div>
      </div>
    </div>
  </div>
  );
};

export default Chat;
