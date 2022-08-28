/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import Channel from './Channel.jsx';

const Channels = (props) => {
  const { channels, currentChannelId } = props;
  console.log(channels);
  const arrayChannels = Object.keys(channels);
  console.log(arrayChannels);
  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {arrayChannels.map((key) => <Channel key={key} channel={channels[key]} currentChannel={currentChannelId}/>)}
  </ul>
  );
};
export default Channels;
