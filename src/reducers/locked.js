const locked = (state={}, action) => {
  switch (action.type) {
    case 'LOCK_CHOICE':
      if (action.id === null) return;
      if (state.myId === 0) {
        return {
          ...state,
          myId: action.id,
        };
      };
      return {
        ...state,
        myId: 0,
      };
    case 'OPPO_LOCK':
      return {
        ...state,
        oppoId: action.id,
      };
    case 'CLEAR':
      return {
        ...state, 
        myId: 0,
        oppoId: 0,
      };
    default:
      return state;
  }
}

export default locked;
