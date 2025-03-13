export interface IUser {
  id: number;
  name: string;
  vacancy: string;
  phone: string;
}

export interface IUserItemProps {
  user: IUser;
  editUser: (user: IUser) => void;
}
