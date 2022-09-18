/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { actions as messageAction } from '../slices/messageSlice.js';
import { actions as channelAction } from '../slices/channelSlice.js';
import { actions as viewAction } from '../slices/viewSlice.js';

export const SocketContext = createContext({});

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => {
    console.log(payload);
    dispatch(messageAction.addNewMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelAction.addNewChannel(payload));
    dispatch(viewAction.switchActiveChannel(payload.id));
  });

  socket.on('renameChannel', (payload) => {
    const { id } = payload;
    dispatch(channelAction.renameChannel({ id, changes: { ...payload } }));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(channelAction.removeChannel(payload));
  });

  const newChannel = (channel) => socket.emit('newChannel', channel);
  const newMessage = (message) => socket.emit('newMessage', message);
  const removeChannel = (id) => socket.emit('removeChannel', { id });
  const renameChannel = (channel) => socket.emit('renameChannel', channel);

  const socketHandles = {
    newMessage,
    newChannel,
    removeChannel,
    renameChannel,
  };

  return (
    <SocketContext.Provider value={socketHandles}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
