import { connect } from 'react-redux'
import { lockChoice, goWait, goBattle } from '../actions'
import Lock from '../components/Lock'
import socket from '../socket';

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
    
  }
}

const LockList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lock)

export default LockList;
