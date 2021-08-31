const choice = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_CHOICE':
      if (state.id !== action.id) {
        return Object.assign({}, state, {
          choosed: false,
        });
      }
      return Object.assign({}, state, {
        choosed: !state.choosed,
      });
    case 'CLEAR':
      return Object.assign({}, state, {
        choosed: false,
      });
    default:
      return state;
  }
}

const choices = (state=[], action) => {
  return state.map(c => choice(c, action));
}

export default choices;