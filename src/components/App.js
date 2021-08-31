import { useEffect } from 'react'
import ChoiceList from '../components/ChoiceList';
import Record from '../components/Record';
import Lock from '../components/Lock';
import LoginList from '../containers/LoginList';
import { useSelector } from 'react-redux'
import socket from '../socket';

const App = () => {
  let s = useSelector((state) => state);
  let now = useSelector((state) => state.now);
  console.log(s);
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <div className="container">
      <LoginList />
      {now !== 'LOGIN' &&
        <div>
          <Record/>
          <ChoiceList />
          <Lock/>
        </div>
      }
    </div>
  )
}

export default App;
