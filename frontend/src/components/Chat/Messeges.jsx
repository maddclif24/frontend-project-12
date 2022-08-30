/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message.jsx';

const Messeges = () => {
  const messages = useSelector((state) => state.messageSlice.messages);
  console.log(messages);
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map((message) => <Message key={message.id} message={message} />)}
    </div>
  );
};
export default Messeges;
