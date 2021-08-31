import { connect } from 'react-redux'
import { toggleChoice } from '../actions'
import ChoiceList from '../components/ChoiceList'
import socket from '../socket'


const mapStateToProps = (state) => {
  return {
    choices: state.choices,
    locked: state.locked,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChoiceClick: (id) => {
      socket.emit("message", {
        method: "choose",
        userID: socket.id,
        choosed: id,
      });
      dispatch(toggleChoice(id))
    }
  }
}


const VisibleChoiceList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChoiceList)

export default VisibleChoiceList;