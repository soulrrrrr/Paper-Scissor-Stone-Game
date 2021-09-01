import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../index.css'
import { enterRoom } from '../actions'
import socket from '../socket';

const Login = ({ room, now, onEnterRoomClick }) => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("roomIsFull", (message) => {alert(message);});
    socket.on("login", (message) => {
      dispatch(enterRoom(message.roomId, message.id));
    });
  }, []);

  if (now === 'LOGIN') {
    return (
      <div>
        <div>
          <label
            className="label"
            htmlFor="room">
            Enter room ID:
          </label>
          <input
            className="room"
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />         
        </div>
        <div>
          <label
            className="box label"
            htmlFor="room">
            Enter your name:
          </label>
          <input
            className="room"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="box btn"
            onClick={() => onEnterRoomClick(roomId, name)}
          >
            Go!
          </button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div>
        <label
          className="box label"
        >
          {`Room: ${room.id}\n`}
        </label>
      </div>
      <div>
        <label
          className="box label"
        >
          {`召喚師: ${room.player}`}
        </label>
      </div>
    </div>
  )
}

export default Login;
