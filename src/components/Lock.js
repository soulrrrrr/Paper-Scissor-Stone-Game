import '../index.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lockChoice } from '../actions';
import socket from '../socket';

const getLockedQuan = (id) => {
  switch (id) {
    case 1:
      return '石頭';
    case 2:
      return '剪刀';
    case 3:
      return '布';
    default:
      return '故障了!';
  }
}

function onLockClick(chooseId) {
  if (chooseId === null || chooseId === 0) return;
  socket.emit("message", {
    method: "lock",
    userId: socket.id,
    locked: chooseId,
  });
}

const Lock = () => {

  const dispatch = useDispatch();
  let choosed = useSelector((state) => state.choices.filter(choice => choice.choosed === true)[0]);
  let locked = useSelector((state) => state.locked);

  useEffect(() => {
    socket.on("noOppo", (msg) => {
      alert(msg);
      dispatch(lockChoice(0));
    });
  }, []);

  return (
    <div>
      <div>
        <button
          className="btn"
          style={{backgroundColor: locked.myId !== 0 && "red"}}
          onClick={() => {
            if (choosed?.id) {
              onLockClick(choosed.id);
              dispatch(lockChoice(choosed.id));
            }
          }}
        >
          {locked.myId === 0 ? 'Lock!' : 'Unlock!'}
        </button>
        <label className="lock">
          {locked.myId !== 0 ? `你出了 ${getLockedQuan(locked.myId)}.` : ""}
        </label>
      </div>
    </div>
  )
}

export default Lock;
