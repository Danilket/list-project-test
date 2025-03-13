import { Modal, Button } from 'antd';
import cl from './EditModal.module.scss';
import { useEffect, useState } from 'react';
import { editUser, setEditModal } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../shared/redux';
import { Input } from 'antd';

const EditModal = () => {
  const dispatch = useDispatch();

  // <SELECTORS>
  const userInfo = useSelector((state: AppState) => state.users.userInfo);
  const editModal = useSelector((state: AppState) => state.users.editModal);
  // </SELECTORS>

  const [formData, setFormData] = useState({
    name: '',
    vacancy: '',
    phone: '',
    id: 0,
  });
  const { name, vacancy, phone } = formData;

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name,
        vacancy: userInfo.vacancy,
        phone: userInfo.phone,
        id: userInfo.id,
      });
    }
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEditUser = () => {
    dispatch(editUser(formData));
    dispatch(setEditModal(false));
  };

  return (
    <Modal
      title="Редактировать юзера"
      open={editModal}
      footer={[
        <Button key="submit" type="primary" onClick={sendEditUser}>
          Редактировать
        </Button>,
      ]}
      onCancel={() => dispatch(setEditModal(false))}
    >
      Имя
      <Input
        className={cl.input}
        value={name}
        name="name"
        onChange={handleChange}
      />
      Вакансия
      <Input className={cl.input} value={vacancy} name="vacancy" />
      Телефон
      <Input className={cl.input} value={phone} name="phone" />
    </Modal>
  );
};

export default EditModal;
