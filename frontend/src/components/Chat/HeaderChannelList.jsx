/* eslint-disable max-len */
import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../slices/channelSlice';

const HeaderChannelList = () => {
  const channels = useSelector(selectors.selectAll);
  const activeChannelId = useSelector((state) => state.viewSlice.activeChannelId);
  const channelFind = channels.find((channel) => channel.id === activeChannelId);
  const channelName = channelFind ? channelFind.name : null;
  // console.log(channels instanceof Object, activeChannelId instanceof Object, channelName ? channelName.name : null, channelName instanceof Object);
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># {channelName}</b>
      </p>
      <span className="text-muted">0 сообщений</span>
    </div>
  );
};
export default HeaderChannelList;
