import React from 'react'
import PropTypes from 'prop-types'
import imgs from '../imgs/index.js'

const getImg = (id) => {
  switch (id) {
    case 1:
      return imgs.Stone;
    case 2:
      return imgs.Scissor;
    case 3:
      return imgs.Paper;
    default:
      return imgs.Stone;
  }
}

const Choice = ({ id, choosed, onClick, locked }) => {
  return (
    <div>
      <img
        className="graph"
        src={getImg(id)}
        alt="scissor"
        onClick={locked.myId === null ? onClick : undefined}
        style={{
          outline: choosed ? "20px solid rgba(244, 200, 0, 0.828)" : ""
        }}
      >
      </img>
    </div>
  )
}
Choice.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Choice;
