import '../index.css';

const getLockedQuan = (id) => {
  switch (id) {
    case 1:
      return 'Stone';
    case 2:
      return 'Scissor';
    case 3:
      return 'Paper';
    default:
      return 'none';
  }
}

const Lock = ({ choosedId, locked, room, now, onLockClick }) => {
  return (
    <div>
      {now !== 'BATTLE' &&
        <div>
          <button
            className="btn"
            style={{backgroundColor: locked.myId !== null && "red"}}
            onClick={() => onLockClick(room, choosedId, locked, now)}
          >
            {locked.myId === null ? 'Lock!' : 'Unlock!'}
          </button>
          <label className="lock">
            {locked.myId !== null ? `You locked ${getLockedQuan(locked.myId)}.` : ""}
          </label>
        </div>
      }
    </div>
  )
}

export default Lock;
