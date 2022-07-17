import React, { useState } from 'react';
import api from './api';
import SearchStatus from './components/searchStatus';
// import Qualitie from './qualitie';
import Users from './components/users';

function App() {
  const [person, setPerson] = useState(api.users.fetchAll());

  const handleDelBtn = (userId) => {
    setPerson((prevState) => prevState.filter((el) => el._id !== userId));
  };

  return <Users persons={person} onDel={handleDelBtn} />;
}

export default App;
