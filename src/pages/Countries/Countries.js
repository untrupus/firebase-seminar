import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCountry} from "../../store/actions";
import CountryCard from "../../components/CountryCard/CountryCard";
import AddCountryModal from "../../components/AddCountryModal/AddCountryModal";
import './style.css';

const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  const countriesJSX = countries?.map((country) => {
    return (
      <CountryCard
        img={country.flag}
        name={country.name}
        area={country.area}
        population={country.population}
        capital={country.capital}
      />
    )
  })
  return (
    <div className='container'>
      <AddCountryModal open={open} close={handleClose}/>
      <div className="blogHeader">
        <button type='button'
                onClick={() => dispatch(getCountry(countries[countries.length - 1].name))}>
          refresh
        </button>
      </div>
      <div className="countries">
        {countriesJSX}
      </div>
    </div>
  );
};

export default Countries;
