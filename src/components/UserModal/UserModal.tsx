import { Modal } from 'antd';
import cl from './UserModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import UserItem from '../UserItem/UserItem';
import {
  setUserModal,
  setIsVisibleAllUsers,
  setEditModal,
  setUserInfo,
} from '../../store';
import { AppState } from '../../shared/redux';
import { IUser } from '../../types/types';
import { Input, Button } from 'antd';

const UserModal = () => {
  const dispatch = useDispatch();

  // <SELECTORS>
  const isVisibleAllUsers = useSelector(
    (state: AppState) => state.users.isVisibleAllUsers
  );
  const users = useSelector((state: AppState) => state.users.users);
  const isModalOpen = useSelector((state: AppState) => state.users.userModal);
  // </SELECTORS>

  // <STATES>
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchUser, setSearchUser] = useState('');
  // </STATES>

  useEffect(() => {
    if (isVisibleAllUsers) dispatch(setIsVisibleAllUsers(false));
    if (searchUser) {
      setFilteredUsers(
        users.filter((user) =>
          user.name.toLowerCase().startsWith(searchUser.toLowerCase())
        )
      );
    } else {
      setFilteredUsers([]);
    }
  }, [searchUser, users]);

  const editUser = (user: IUser) => {
    dispatch(setEditModal(true));
    dispatch(setUserInfo(user));
  };
  const close = () => {
    dispatch(setUserModal(false));
    setSearchUser('');
  };

  const usersToRender = isVisibleAllUsers ? users : filteredUsers;

  return (
    <Modal
      title="Найти юзера"
      open={isModalOpen}
      footer={false}
      onCancel={close}
    >
      <Input
        type="text"
        placeholder="Найти юзера"
        onChange={(e) => setSearchUser(e.target.value)}
        value={searchUser}
      />
      <ul className={cl.usersContainer}>
        {usersToRender &&
          usersToRender.map((user, index) => (
            <UserItem key={index} user={user} editUser={editUser} />
          ))}
      </ul>
      <Button
        className={cl.modalButton}
        onClick={() => dispatch(setIsVisibleAllUsers(true))}
      >
        Показать всех юзеров
      </Button>
    </Modal>
  );
};

export default UserModal;
