import React, { useState } from 'react';
import api from '../api';
import SearchStatus from './searchStatus';
// import Qualitie from './qualitie';
import User from './user';

const Users = ({ persons, ...rest }) => {
  // const persons = props;
  // console.log(persons);
  // const [person, setPerson] = useState(api.users.fetchAll());

  // const handleDelBtn = (userId) => {
  //   setPerson((prevState) => prevState.filter((el) => el._id !== userId));
  // };

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
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <>
            {persons.map((el) => (
              <tr key={el.name}>
                <User user={el} onClick={rest.onDel} />
                <td>
                  {/* <button className="btn btn-danger" onClick={() => handleDelBtn(el._id)}>
                    delete
                  </button> */}
                </td>
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </>
  );
};

export default Users;
