/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import Channel from './Channel.jsx';

const Channels = () => {
  const channels = useSelector((state) => state.channels.entities);
  const arrayChannels = Object.keys(channels);
  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {arrayChannels.map((key) => <Channel key={key} channel={channels[key]} currentChannel={1}/>)}
  </ul>
  );
};
export default Channels;
