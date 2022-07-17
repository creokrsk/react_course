import React from 'react';
import Qualitie from './qualitie';

const User = ({ user, ...rest }) => {
  return (
    <>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((qual) => (
          <Qualitie key={qual._id} color={qual.color} _id={qual._id} name={qual.name} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        <button className="btn btn-danger" onClick={() => rest.onClick(user._id)}>
          delete
        </button>
      </td>
    </>
  );
};

export default User;
