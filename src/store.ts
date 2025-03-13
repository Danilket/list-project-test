import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './types/types';

interface FirstSliceState {
  users: IUser[];
  userModal: boolean;
  editModal: boolean;
  isVisibleAllUsers: boolean;
  userInfo: IUser;
}

const initialState: FirstSliceState = {
  users: [],
  userModal: false,
  editModal: false,
  isVisibleAllUsers: false,
  userInfo: {
    id: 0,
    name: '',
    vacancy: '',
    phone: '',
  },
};

const setUsers = (users: {}) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const slice = createSlice({
  name: 'firstStore',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
      setUsers(state.users);
    },
    editUser: (state, action: PayloadAction<IUser>) => {
      const index = state.users.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
        setUsers(state.users);
      }
    },
    deleteUser: (state, action: PayloadAction<IUser>) => {
      state.users = state.users.filter((item) => item.id !== action.payload.id);
      setUsers(state.users);
    },
    deleteAllUsers: (state) => {
      state.users = [];
      setUsers(state.users);
    },
    setUserModal: (state, action) => {
      state.userModal = action.payload;
    },
    setEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    setIsVisibleAllUsers: (state, action) => {
      state.isVisibleAllUsers = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    getUsers: (state) => {
      const usersFromStorage = localStorage.getItem('users');
      state.users = usersFromStorage ? JSON.parse(usersFromStorage) : [];
    },
  },
});

export const {
  addUser,
  editUser,
  deleteUser,
  deleteAllUsers,
  setUserModal,
  setEditModal,
  setIsVisibleAllUsers,
  setUserInfo,
  getUsers,
} = slice.actions;

const store = configureStore({
  reducer: {
    users: slice.reducer,
  },
});

export default store;
