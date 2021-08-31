const room = (state={}, action) => {
  if (action.id === "") return state;
  switch(action.type) {
    case 'ENTER_ROOM':
      let id = action.id;
      let player = action.player;
      return {
        id,
        player,
      };
    default:
      return state;
  }
}

export default room;
