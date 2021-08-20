const room = (state={}, action) => {
  if (action.id === "") return state;
  switch(action.type) {
    case 'ENTER_ROOM':
      if (action.pos === 2) {
        return state;
      }
      let id = action.id;
      let player = action.player;
      return {
        id,
        pos: action.pos,
        player,
      };
    default:
      return state;
  }
}

export default room;
