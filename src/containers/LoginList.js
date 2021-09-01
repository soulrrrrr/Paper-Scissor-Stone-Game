import { connect } from 'react-redux'
import { enterRoom } from '../actions'
import Login from '../components/Login'
import socket from '../socket'

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
        socket.emit("message", {
          method: "login",
          id: player,
          roomId: id,
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

