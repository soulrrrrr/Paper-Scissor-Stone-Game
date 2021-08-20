import React from 'react'
import { useState } from 'react'
// import { database } from '../config'
import '../index.css'

const Login = ({ room, now, onEnterRoomClick }) => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');

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
