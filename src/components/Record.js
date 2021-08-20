import { useState } from 'react'
import { connect } from 'react-redux';
import { useSelector } from 'react-redux'
import '../index.css'
import { database } from '../config'
import { goIdle, goWait, goBattle, clear, oppoLock, win, lose } from '../actions'

const quan = {
  1: '石頭',
  2: '剪刀',
  3: '布',
};

let Record = ({ dispatch }) => {
  const [oppoLogin, setOppoLogin] = useState(false);
  const [battleResult, setBattleResult] = useState('');
  let score = useSelector((state) => state.record);
  let room = useSelector((state) => state.room);
  let locked = useSelector((state) => state.locked);
  let now = useSelector((state) => state.now);
  let oppoPos = (room.pos === 0 ? 1 : 0);
  database.ref(`rooms/${room.id}/${room.pos}`).onDisconnect().remove();
  
  let battle = (myId, oppoId) => {
    console.log(myId, oppoId);
    if (myId === oppoId) {
      return `平手~~~`;
    }
    else if ((myId+1)%3 === oppoId%3) {
      dispatch(win());
      return `你贏了!`;
    }
    else {
      dispatch(lose());
      return `你輸了...`;
    }
  }

  if (now !== 'LOGIN' && !oppoLogin) {
    let oppo = database.ref(`rooms/${room.id}/${oppoPos}`);
    oppo.on('value', (snapshot) => {
      if (snapshot.exists()) {
        alert(`${snapshot.val().player}已加入戰局!`);
        setOppoLogin(true);
        oppo.off();
      }
    });
  };
  
  if (!locked.oppoId) {
    let oppo = database.ref(`rooms/${room.id}/${oppoPos}/lock`);
    oppo.on('value', (snapshot) => {
      const data = snapshot.val();
      if (now === 'IDLE' && data && !locked.oppoId) {
        dispatch(oppoLock(data));
      }
      if (now === 'WAIT' && data) {
        dispatch(oppoLock(data));
      }
      if (now === 'BATTLE' && !data) {
        dispatch(goIdle());
      }
    });
  }
  else if (now === 'IDLE' && locked.myId && locked.oppoId) {
    dispatch(goWait());
  }
  else if (now === 'WAIT' && locked.myId && locked.oppoId) {
    dispatch(goBattle());
  }
  else if (now === 'BATTLE' && locked.myId && locked.oppoId && !battleResult) {
    setBattleResult(() => battle(locked.myId, locked.oppoId));
  }

  return (
    <div className="label">
      {now !== 'BATTLE' && locked.oppoId && 
        <div>
          {`你的對手已出拳!`}
        </div>
      }
      {now === "BATTLE" && locked.myId && 
        <div>
          <div>
            {`你的對手出${quan[locked.oppoId]}`}
          </div>
          <div>
            {battleResult}
          </div>
          <button
            className="btn"
            onClick={() => {
              dispatch(clear());
              database.ref(`rooms/${room.id}/${room.pos}`).update({
                lock: null,
              });
            }}
          >
            下一把
          </button>
        </div>
      }
      <div>
        Win: {score.win}
      </div>
      <div>
        Lose: {score.lose}
      </div>
    </div>
  )
}

Record = connect()(Record);

export default Record;
