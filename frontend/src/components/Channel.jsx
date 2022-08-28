/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import cn from 'classnames';

const Channel = ({ channel, currentChannel }) => {
  const cnButton = cn('w-100', 'rounded-0', 'text-start', 'btn', currentChannel === channel.id ? 'btn-secondary' : '');
  return (
    <li className="nav-item w-100">
    <button type="button" className={cnButton}>
      <span className="me-1">#</span>{channel.name}
    </button>
  </li>
  );
};
export default Channel;
