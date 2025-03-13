import InputsList from './components/InputsList/InputsList';
import LettersList from './components/LettersList/LettersList';
import UserModal from './components/UserModal/UserModal';
import EditModal from './components/EditModal/EditModal';
import { Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { getUsers } from './store';

const { Title } = Typography;
const { Link } = Typography;

function App() {
  const dispatch = useDispatch();
  dispatch(getUsers());

  return (
    <>
      <Title level={1}>Contact List on JS</Title>
      <Link href="https://reactjs.org" target="_blank">
        Ссылкааа
      </Link>
      <InputsList></InputsList>
      <LettersList></LettersList>
      <UserModal></UserModal>
      <EditModal></EditModal>
    </>
  );
}

export default App;
