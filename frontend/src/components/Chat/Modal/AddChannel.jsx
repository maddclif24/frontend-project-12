/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
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

const AddChannel = ({ show, close }) => {
  const dispacth = useDispatch();

  const channelSchema = Yup.object().shape({
    name: Yup.string()
      .max(20, 'От 3 до 20 символов'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelSchema,
    onSubmit: (values) => {
      console.log(values);
      const channel = { name: values.name.trim() };
      socket.emit('newChannel', channel);
      socket.on('newChannel', (payload) => {
        console.log(payload);
        dispacth(viewActions.switchActiveChannel(payload.id));
        dispacth(channelActions.addNewChannel(payload));
      });
    },
  });

  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit} id="ChannelSubmit">
            <Form.Group className="mb-3" controlId="name">
              <Form.Control
                type="text"
                autoFocus
                name="name"
                required
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close} variant="secondary">
            Закрыть
          </Button>
          <Button type="submit" form="ChannelSubmit" onClick={close} variant="primary">
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddChannel;
