import { connect } from 'react-redux'
import { lockChoice, goWait, goBattle } from '../actions'
import Lock from '../components/Lock'
import { database } from '../config'

const mapStateToProps = (state) => {
  let lockedChoice = state.choices.filter(choice => choice.choosed === true)[0]
  return {
    choosedId: lockedChoice ? lockedChoice.id : null,
    locked: state.locked,
    room: state.room,
    now: state.now,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLockClick: (room, chooseId, locked, now) => {
      console.log(now);
      if (chooseId === null) return;
      // if (locked.myId !== null && now === 'IDLE') {
      //   database.ref(`rooms/${room.id}/${room.pos}`).update({
      //     lock: null,
      //   })
      //   dispatch(lockChoice(chooseId));
      // }
      if (now === 'IDLE') {
        dispatch(goWait());
        dispatch(lockChoice(chooseId));
        database.ref(`rooms/${room.id}/${room.pos}`).update({
          lock: chooseId,
        });
      }
      else return;
    }
  }
}

const LockList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lock)

export default LockList;
