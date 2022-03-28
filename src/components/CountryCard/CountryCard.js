import React from 'react';
import './style.css';

const CountryCard = ({img, name, area, capital, population}) => {
  return (
    <div className='countryCard'>
      <img src={img} alt="flag" className='flag'/>
      <div>
        <h3>{name}</h3>
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>
        <p>Area: {area} km</p>
      </div>
    </div>
  );
};

export default CountryCard;
