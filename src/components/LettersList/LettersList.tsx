import cl from './LettersList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteUser } from '../../store';
import { AppState } from '../../shared/redux';
import { IUser } from './../../types/types';

const LettersList = () => {
  const dispatch = useDispatch();

  const users = useSelector((state: AppState) => state.users.users);

  const englishLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const firstList = englishLetters.slice(0, 13); // A-M
  const secondList = englishLetters.slice(13); // N-Z

  const [visibleLetters, setVisibleLetters] = useState<{
    [key: string]: boolean;
  }>({});

  const countObjectsByFirstLetter = (array: IUser[], letter: string) => {
    const filteredArray = array.filter(
      (item) => item.name.charAt(0).toLowerCase() === letter.toLowerCase()
    );

    return filteredArray;
  };

  return (
    <div className={cl.lists}>
      {[firstList, secondList].map((item, index) => (
        <ul className={cl.list} key={index}>
          {item.map((letter, index) => {
            const letterUsers = countObjectsByFirstLetter(
              users as IUser[],
              letter
            );
            const isVisible = !!visibleLetters[letter];

            return (
              <li
                className={`${cl.item} ${
                  letterUsers.length ? cl.hasCounter : ''
                }`}
                key={index}
                onClick={() => {
                  setVisibleLetters((prev) => ({
                    ...prev,
                    [letter]: !prev[letter],
                  }));
                }}
              >
                <div className={cl.letterCount}>
                  <div className={cl.letter}>{letter}</div>
                  <div className={cl.counter}>
                    {letterUsers.length > 0 && letterUsers.length}
                  </div>
                </div>
                {letterUsers.length > 0 && (
                  <ul className={`${cl.users} ${isVisible ? cl.visible : ''}`}>
                    {letterUsers.map((user, userIndex) => (
                      <li className={cl.user} key={userIndex}>
                        <div className={cl.userInfo}>
                          <div>Name: {user.name}</div>
                          <div>Vacancy: {user.vacancy}</div>
                          <div>Phone: {user.phone}</div>
                        </div>
                        <button
                          className={cl.delete}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(deleteUser(user));
                          }}
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
};

export default LettersList;
