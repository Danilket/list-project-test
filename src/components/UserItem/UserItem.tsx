import cl from './UserItem.module.scss';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../store';
import { IUserItemProps } from '../../types/types';

const UserItem = ({ user, editUser }: IUserItemProps) => {
  const dispatch = useDispatch();

  return (
    <li className={cl.user}>
      <div>
        <div>{user.name}</div>
        <div>{user.vacancy}</div>
        <div>{user.phone}</div>
      </div>
      <div className={cl.buttons}>
        <button
          className={cl.delete}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteUser(user));
          }}
        >
          X
        </button>
        <button onClick={() => editUser(user)}>EDIT</button>
      </div>
    </li>
  );
};

export default UserItem;
