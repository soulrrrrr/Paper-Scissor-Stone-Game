const locked = (state={}, action) => {
  switch (action.type) {
    case 'LOCK_CHOICE':
      if (action.id === null) return;
      if (state.myId === null) {
        return {
          ...state,
          myId: action.id,
        };
      };
      return {
        ...state,
        myId: null,
      };
    case 'OPPO_LOCK':
      return {
        ...state,
        oppoId: action.id,
      };
    case 'CLEAR':
      return {
        ...state, 
        myId: null,
        oppoId: null,
      };
    default:
      return state;
  }
}

export default locked;
