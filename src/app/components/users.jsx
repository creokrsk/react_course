import React from 'react';
import SearchStatus from './searchStatus';
import User from './user';

const Users = ({ persons, onDel, onAddToFavorites }) => {
  if (persons.length === 0) {
    return <SearchStatus length={persons.length} />;
  }
  return (
    <>
      <SearchStatus length={persons.length} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <>
            {persons.map((el) => (
              <tr key={el._id}>
                <User user={el} onClick={onDel} onClickBookmark={onAddToFavorites} />
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </>
  );
};

export default Users;
