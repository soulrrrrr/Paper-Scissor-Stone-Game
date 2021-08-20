const now = (state='LOGIN', action) => {
  if (action.now === null) return state;
  switch (action.type) {
    case 'ENTER_ROOM':
      if (action.pos === 2)
        return 'LOGIN';
      return 'IDLE';
    case 'GO_IDLE':
      return 'IDLE';
    case 'GO_WAIT':
      return 'WAIT';
    case 'GO_BATTLE':
      return 'BATTLE';
    default:
      return state;
  }
}

export default now;
