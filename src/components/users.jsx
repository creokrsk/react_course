import React, {useState} from "react";
import api from "../api"

const Users =() =>{
  const  [person, setPerson] = useState(api.users.fetchAll());

  const handleDelBtn = (userId) =>{
    setPerson((prevState) =>prevState.filter((el) => el._id!==userId))
  }

  const getColor = (color) =>{
    let classes = "badge bg-";
  classes += String(color);
  return classes;
  };

  const qualitiesRender = (arr) =>{
    return arr.map(el =>(
      <span
      style={{ margin: 5 }}
      key={el._id}
      className={getColor(el.color)}>
        {el.name}
      </span>
    ))
  }

  const phraseRender = (number) => {
    if(number.length===1) {
      return(<h1><span className="badge bg-primary">{number.length} человек тусанёт с тобой сегодня</span></h1>)
    }
     else if(number.length<5) {
      return(<h1><span className="badge bg-primary">{number.length} человека тусанут с тобой сегодня</span></h1>)
    } else if(number.length>=5) {
      return(<h1><span className="badge bg-primary">{number.length} человек тусанёт с тобой сегодня</span></h1>)
    }
  }

  if(person.length === 0) {
    return(<h1><span className="badge bg-danger">Никто с тобой не тусанёт</span></h1>)
  }
  return(
  <>
  <>{phraseRender(person)}</>
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
    <>{person.map(el =>(
      <tr key={el.name}>
        <td>{el.name}</td>
        <td>{qualitiesRender(el.qualities)}</td>
        <td>{el.profession.name}</td>
        <td>{el.completedMeetings}</td>
        <td>{el.rate}</td>
        <td><button className='btn btn-danger' onClick={() =>handleDelBtn(el._id)}>delete</button></td>
      </tr>
    ))}
    </>
    </tbody>

</table></>);

}

export default Users;
