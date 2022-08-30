/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const activeChannel = useSelector((state) => state.viewSlice.activeChannelId);
  const cnButton = cn('w-100', 'rounded-0', 'text-start', 'btn', activeChannel === channel.id ? 'btn-secondary' : '');
  return (
    <li className="nav-item w-100">
    <button type="button" id={channel.id} className={cnButton}>
      <span className="me-1">#</span>{channel.name}
    </button>
  </li>
  );
};
export default Channel;
