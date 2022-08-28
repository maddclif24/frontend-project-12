/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { normalize, schema } from 'normalizr';
import routes from '../routes';
import useAuth from '../hooks/index.jsx';
import { actions as channelActions, name } from '../slices/channelSlice.js';
import Channels from './Channels.jsx';
import Title from './GeneralTitle.jsx';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const getNormalalized = (data) => {
    const shema = new schema.Entity('channels');

    const normalizedData = normalize(data, [shema]);

    return normalizedData;
  };

  const store = useSelector((state) => state.channels);

  useEffect(() => {
    const fetchData = async () => {
      const { token } = JSON.parse(localStorage.getItem('user', 'token'));
      const { data } = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${token}` } });
      console.log(data);
      const normalizedData = getNormalalized(data.channels);
      console.log(normalizedData);
      const { channels } = normalizedData.entities;
      dispatch(channelActions.addChannels({ entities: channels, ids: Object.keys(channels), currentChannelId: data.currentChannelId }));
    };
    fetchData();
  }, []);

  return (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>Каналы</span>
          <button type="button" className="p-0 text-primary btn btn-group-vertical">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <Channels channels={store.entities} currentChannelId={store.currentChannelId}/>
      </div>
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <Title currentChannel={store} />
          <div
            id="messages-box"
            className="chat-messages overflow-auto px-5 "
          ></div>
          <div className="mt-auto px-5 py-3">
            <Form noValidate="" className="py-1 border rounded-2">
              <div className="input-group has-validation">
                <input
                  name="body"
                  aria-label="Новое сообщение"
                  placeholder="Введите сообщение..."
                  className="border-0 p-0 ps-2 form-control"
                  value=""
                />
                <button
                  type="submit"
                  disabled=""
                  className="btn btn-group-vertical"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className='hover__input__svg'
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                    ></path>
                  </svg>
                  <span className="visually-hidden">Отправить</span>
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Chat;
