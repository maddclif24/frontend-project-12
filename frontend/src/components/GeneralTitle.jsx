/* eslint-disable react/prop-types */
import React from 'react';

const Title = ({ currentChannel }) => {
  const obj = Object(currentChannel.entities[currentChannel.currentChannelId]);
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># {obj.name}</b>
      </p>
      <span className="text-muted">0 сообщений</span>
    </div>
  );
};
export default Title;
