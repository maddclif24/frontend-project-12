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
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import {
  actions as channelActions,
  selectors as channelSelectors,
} from '../../../slices/channelSlice.js';
import { actions as viewActions } from '../../../slices/viewSlice.js';

const socket = io('http://0.0.0.0:5001');

const RenameChannel = ({
  show, close, id, setShow,
}) => {
  const dispacth = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();

  const selectChannelName = useSelector((state) => channelSelectors.selectById(state, id)).name;
  const channelSchema = Yup.object().shape({
    name: Yup.string().max(20, 'От 3 до 20 символов'),
  });

  const formik = useFormik({
    initialValues: {
      name: `${selectChannelName}`,
    },
    validationSchema: channelSchema,
    onSubmit: (values) => {
      const channel = { id, name: values.name.trim() };
      socket.emit('renameChannel', channel);
      socket.on('renameChannel', (payload) => {
        dispacth(channelActions.renameChannel({ id, changes: { ...payload } }));
      });
      setShow(false);
      toast.success(t('tostify.successRename'));
    },
  });

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.select();
    }, 1);
  }, []);

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать Канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} id="ChannelSubmit">
          <Form.Group className="mb-3">
            <Form.Control
              name="name"
              required
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={inputRef}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close} variant="secondary">
          Закрыть
        </Button>
        <Button type="submit" form="ChannelSubmit" variant="primary">
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default RenameChannel;
