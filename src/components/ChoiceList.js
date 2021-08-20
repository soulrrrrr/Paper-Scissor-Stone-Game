import React from 'react'
import Choice from './Choice'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { database } from '../config'
import '../index.css';

const ChoiceList = ({ choices, onChoiceClick, locked }) => {
  let room = useSelector((state) => state.room);
  return (
    <div className="choice-list">
      {choices.map((choice) =>
        <Choice
          key={choice.id}
          {...choice}
          locked={locked}
          onClick={() => {
            database.ref(`rooms/${room.id}/${room.pos}`).update({
              choose: choice.id,
            })
            onChoiceClick(choice.id)
          }}
        /> 
      )}
    </div>
  )
}

ChoiceList.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    choosed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  onChoiceClick: PropTypes.func.isRequired
}

export default ChoiceList;
