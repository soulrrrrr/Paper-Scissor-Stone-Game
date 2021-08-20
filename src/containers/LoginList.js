import { connect } from 'react-redux'
import { enterRoom } from '../actions'
import Login from '../components/Login'
import { database } from '../config'

const mapStateToProps = (state) => {
  return {
    room: state.room,
    now: state.now,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEnterRoomClick: (id, player) => {
      if (id === "" || player === "") {
        alert("Please enter room id and your name.");
      }
      else {
        database.ref(`rooms/${id}/0`).once("value", snapshot => {
          if (snapshot.exists()){
            database.ref(`rooms/${id}/1`).once("value", snapshot => {
              if (snapshot.exists()) {
                alert('The room is full now.');
              }
              else {
                database.ref(`rooms/${id}/1`).set({
                  player: player,
                  lock: null,
                });
                dispatch(enterRoom(id, 1, player));
              }
            })
          }
          else {
            database.ref(`rooms/${id}/0`).set({
              player: player,
              lock: null,
            });
            dispatch(enterRoom(id, 0, player));
          }
        });
      }
    }
  }
}

const LoginList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)

export default LoginList;

