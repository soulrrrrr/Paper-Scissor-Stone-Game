import React from 'react'
import VisibleChoiceList from '../containers/VisibleChoiceList';
import Record from '../components/Record';
import LockList from '../containers/LockList';
import LoginList from '../containers/LoginList';
import { useSelector } from 'react-redux'

const App = () => {
  let room = useSelector((state) => state.room);
  let now = useSelector((state) => state.now);
  let state = useSelector((state) => state);

  console.log(state);
  return (
    <div className="container">
      <LoginList />
      {now !== 'LOGIN' &&
        <div>
          <Record/>
          <VisibleChoiceList />
          <LockList />
        </div>
      }
    </div>
  )
}

export default App;
