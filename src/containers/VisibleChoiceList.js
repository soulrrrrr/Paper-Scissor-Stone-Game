import { connect } from 'react-redux'
import { toggleChoice } from '../actions'
import ChoiceList from '../components/ChoiceList'


const mapStateToProps = (state) => {
  return {
    choices: state.choices,
    locked: state.locked,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChoiceClick: (id) => {
      dispatch(toggleChoice(id))
    }
  }
}


const VisibleChoiceList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChoiceList)

export default VisibleChoiceList;