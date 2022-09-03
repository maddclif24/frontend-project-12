/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal, Form, Button, CloseButton,
} from 'react-bootstrap';
import { io } from 'socket.io-client';
import * as Yup from 'yup';
import { actions as channelActions } from '../../../slices/channelSlice.js';
import { actions as viewActions } from '../../../slices/viewSlice.js';

const socket = io();

const RemoveChannel = ({
  show, close, id, setShow,
}) => {
  // console.log(id);
  const dispacth = useDispatch();
  const removeChannel = (channelId) => (e) => {
    e.preventDefault();
    socket.emit('removeChannel', { id });
    socket.on('removeChannel', (payload) => {
      console.log(payload);
      dispacth(channelActions.removeChannel(payload));
    });
    setShow(false);
    dispacth(viewActions.switchActiveChannel(1));
  };

  return (
      <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Закрыть
          </Button>
          <Button variant="danger" onClick={removeChannel(id)}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
  );
};
export default RemoveChannel;
