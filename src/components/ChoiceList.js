import React from 'react'
import Choice from './Choice'
import { useSelector, useDispatch } from 'react-redux'
import { toggleChoice } from '../actions';
import socket from '../socket';
import '../index.css';

const ChoiceList = () => {
  let choices = useSelector((state) => state.choices);
  let locked = useSelector((state) => state.locked);
  const dispatch = useDispatch();
  return (
    <div className="choice-list">
      {choices.map((choice) =>
        <Choice
          key={choice.id}
          {...choice}
          locked={locked}
          onClick={() => {
            dispatch(toggleChoice(choice.id));
          }}
        /> 
      )}
    </div>
  )
}

export default ChoiceList;
