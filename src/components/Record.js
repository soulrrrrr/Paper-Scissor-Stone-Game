import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import '../index.css'
import socket from '../socket';
import { clear, win, lose } from '../actions'

const quan = {
  1: '石頭',
  2: '剪刀',
  3: '布',
};

let Record = () => {
  const [oppoLock, setOppoLock] = useState(0);
  const [battle, setBattle] = useState(false);
  const [battleResult, setBattleResult] = useState('');
  const dispatch = useDispatch();

  let score = useSelector((state) => state.record);
  
  useEffect(() => {
    socket.on("message", (msg) => {
      if (msg.method === "oppoLock") {
        console.log(msg.oppoLock);
        setOppoLock(msg.oppoLock);
      }

      if (msg.method === "battleResult") {
        setBattle(true);
        if (msg.battleResult === 1) {
          setBattleResult('你贏了!');
          dispatch(win());
        }
        else if (msg.battleResult === -1) {
          setBattleResult('你輸了..');
          dispatch(lose());
        }
        else {
          setBattleResult('平手~~~');
        }
        console.log(msg.battleResult);
      }
    });

  }, []);

  return (
    <div className="label">
      <div>
        Win: {score.win}
        Lose: {score.lose}
      </div>
      {oppoLock !== 0 && 
        <div>
          {`你的對手已出拳!`}
        </div>
      }
      {battle && 
        <div>
          <div>
            {`你的對手出${quan[oppoLock]}`}
          </div>
          <div>
            {battleResult}
          </div>
          <button
            className="btn"
            onClick={() => {
              setOppoLock(0);
              setBattle(false);
              setBattleResult('');
              socket.emit("message", {
                method: "restart",
              });
              dispatch(clear());
            }}
          >
            下一把
          </button>
        </div>
      }
    </div>
  )
}

export default Record;
