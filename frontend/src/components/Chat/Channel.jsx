/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { actions as viewActions } from '../../slices/viewSlice.js';
import RenameChannel from './Modal/RenameChannel.jsx';
import RemoveChannel from './Modal/RemoveChannel.jsx';

const Channel = ({ channel }) => {
  const [isShowRename, setShowRename] = useState(false);
  const [isShowRemove, setShowRemove] = useState(false);

  const handleClick = () => setShowRename(true);

  const handleClose = () => setShowRename(false);

  const handleClickRemove = () => setShowRemove(true);

  const handleCloseRemove = () => setShowRemove(false);

  const dispatch = useDispatch();
  const activeChannel = useSelector((state) => state.viewSlice.activeChannelId);
  const cnButton = cn(
    'w-100',
    'rounded-0',
    'text-start',
    'btn',
    activeChannel === channel.id ? 'btn-secondary' : '',
  );

  const button = (
    <button
      type="button"
      id={channel.id}
      onClick={() => dispatch(viewActions.switchActiveChannel(Number(channel.id)))
      }
      className={cnButton}
    >
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );

  const dropDown = (
    <>
    <Dropdown as={ButtonGroup}>
      {button}

      <Dropdown.Toggle split variant="outline-secondary" id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={handleClickRemove}>Удалить</Dropdown.Item>
        { isShowRemove ? <RemoveChannel show={isShowRemove} setShow={setShowRemove} id={button.props.id} close={handleCloseRemove}/> : null }
        <Dropdown.Item href="#" onClick={handleClick}>Переименовать</Dropdown.Item>
        {isShowRename ? <RenameChannel show={isShowRename} setShow={setShowRename} id={button.props.id} close={handleClose}/> : null }
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
  return (
    channel.removable ? dropDown : button
  );
  /* return (
    <Dropdown as={ButtonGroup}>
      <li className="nav-item w-100">
        <Button
          type="button"
          id={channel.id}
          onClick={() => dispatch(viewActions.switchActiveChannel(Number(channel.id)))
          }
          className={cnButton}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      </li>
      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
  */
};
export default Channel;
