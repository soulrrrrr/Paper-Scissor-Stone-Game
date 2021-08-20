const records = (state={win: 0, lose: 0}, action) => {
  switch (action.type) {
    case 'ENTER_ROOM':
      return {
        win: 0,
        lose: 0,
      };
    case 'WIN':
      return Object.assign({}, state, {
        win: state.win+1,
      });
    case 'LOSE':
      return Object.assign({}, state, {
        lose: state.lose+1,
      });
    default:
      return state;
  }
}

export default records;