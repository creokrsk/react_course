import React from 'react';

const Qualitie = ({ color, _id, name }) => {
  const getColor = (color) => {
    let classes = 'badge bg-';
    classes += String(color);
    return classes;
  };

  return (
    <span style={{ marginRight: 10 }} key={_id} className={getColor(color)}>
      {name}
    </span>
  );
};

export default Qualitie;
