/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal, Form, Button, CloseButton,
} from 'react-bootstrap';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import * as Yup from 'yup';
import {
  actions as channelActions,
  selectors as channelSelectors,
} from '../../../slices/channelSlice.js';
import useChat from '../../../hooks/useChat.jsx';
import { actions as viewActions } from '../../../slices/viewSlice.js';

// const socket = io('http://0.0.0.0:5001');

const RenameChannel = ({
  show, close, id, setShow,
}) => {
  const dispacth = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const { renameChannel } = useChat();

  const selectChannelName = useSelector((state) => channelSelectors.selectById(state, id)).name;
  const channels = useSelector(channelSelectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);

  const channelSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20)
      .notOneOf(channelsNames, 'Должен быть уникальным'),
  });

  const formik = useFormik({
    initialValues: {
      name: `${selectChannelName}`,
    },
    validationSchema: channelSchema,
    onSubmit: (values) => {
      const channel = { id, name: values.name.trim() };
      renameChannel(channel);
      /* socket.emit('renameChannel', channel);
      socket.on('renameChannel', (payload) => {
        dispacth(channelActions.renameChannel({ id, changes: { ...payload } }));
      });
      */
      close();
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
        <Modal.Title>{t('chatPage.channels.modalRename.title')}</Modal.Title>
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
              className={cn(
                'form-control',
                formik.errors.name ? 'is-invalid' : 'valid',
              )}
            />
            { formik.errors?.name ? <div className="invalid-feedback">{formik.errors.name}</div> : null}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close} variant="secondary">
        {t('chatPage.channels.modalRename.close')}
        </Button>
        <Button type="submit" form="ChannelSubmit" variant="primary">
        {t('chatPage.channels.modalRename.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default RenameChannel;
