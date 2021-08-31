export const toggleChoice = (id) => {
  return {
    type: 'TOGGLE_CHOICE',
    id
  }
}

export const lockChoice = (id) => {
  return {
    type: 'LOCK_CHOICE',
    id
  }
}

export const enterRoom = (id, player) => {
  return {
    type: 'ENTER_ROOM',
    id,
    player,
  }
}

export const goIdle = () => {
  return {
    type: 'GO_IDLE',
  }
}

export const goWait = () => {
  return {
    type: 'GO_WAIT',
  }
}

export const goBattle = () => {
  return {
    type: 'GO_BATTLE',
  }
}


export const oppoLock = (id) => {
  return {
    type: 'OPPO_LOCK',
    id,
  }
}

export const clear = () => {
  return {
    type: 'CLEAR',
  }
}

export const win = () => {
  return {
    type: 'WIN',
  }
}

export const lose = () => {
  return {
    type: 'LOSE',
  }
}
