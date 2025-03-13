import React, { useState } from 'react';
import cl from './InputsList.module.scss';
import { useDispatch } from 'react-redux';
import { addUser, deleteAllUsers, setUserModal } from '../../store';
import { IUser } from '../../types/types';
import { Input, Button } from 'antd';

const InputsList = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<IUser>({
    name: '',
    vacancy: '',
    phone: '',
    id: 0,
  });
  const { name, vacancy, phone } = formData;
  const [errors, setErrors] = useState({ name: '', vacancy: '', phone: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, id: Math.random() }));
  };

  const validateFields = () => {
    let newErrors = { name: '', vacancy: '', phone: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Введите имя';
      isValid = false;
    } else if (name.trim().length < 3) {
      newErrors.name = 'Имя должно содержать минимум 3 символа';
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(name.trim())) {
      newErrors.name = 'Имя должно содержать только английские буквы';
      isValid = false;
    }

    if (!vacancy.trim()) {
      newErrors.vacancy = 'Введите вакансию';
      isValid = false;
    } else if (vacancy.trim().length < 3) {
      newErrors.vacancy = 'Вакансия должна содержать минимум 3 символа';
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(vacancy.trim())) {
      newErrors.vacancy = 'Вакансия должна содержать только английские буквы';
      isValid = false;
    }
    if (!phone.trim()) {
      newErrors.phone = 'Введите телефон';
      isValid = false;
    } else if (!/^(\+7|8)\d{10}$/.test(phone.trim())) {
      newErrors.phone =
        'Номер телефона должен быть в формате +7XXXXXXXXXX или 8XXXXXXXXXX';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setFormData({
        name: '',
        vacancy: '',
        phone: '',
        id: 0,
      });
      dispatch(addUser(formData));
    }
  };

  return (
    <ul className={cl.list}>
      <li className={cl.item}>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={name}
          onChange={handleChange}
          status={errors.name ? 'error' : ''}
        />
        {errors.name && <p className={cl.error}>{errors.name}</p>}
      </li>
      <li className={cl.item}>
        <Input
          type="text"
          placeholder="Вакансия"
          name="vacancy"
          value={vacancy}
          onChange={handleChange}
          status={errors.vacancy ? 'error' : ''}
        />
        {errors.vacancy && <p className={cl.error}>{errors.vacancy}</p>}
      </li>
      <li className={cl.item}>
        <Input
          type="tel"
          placeholder="Телефон"
          name="phone"
          value={phone}
          onChange={handleChange}
          status={errors.phone ? 'error' : ''}
        />
        {errors.phone && <p className={cl.error}>{errors.phone}</p>}
      </li>
      <li className={cl.item}>
        <Button onClick={validateFields}>Добавить</Button>
      </li>
      <li className={cl.item}>
        <Button onClick={() => dispatch(deleteAllUsers())}>
          Очистить список
        </Button>
      </li>
      <li className={cl.item} onClick={() => dispatch(setUserModal(true))}>
        <Button>Найти</Button>
      </li>
    </ul>
  );
};

export default InputsList;
