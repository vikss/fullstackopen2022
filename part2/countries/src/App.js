import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';




const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([])

  const handleFilterChange = (event) => {
    console.log("Target's value is ", event.target.value)
    setFilter(event.target.value)

  }

  useEffect(() => {

    let arr = countries.filter(c => {
      console.log("Filter is ", filter)
      return c.name.common.toLowerCase().includes(filter.toLocaleLowerCase())
    })
    console.log("Filtered array is ", arr.map(a => a.name.common))
    setCountry(arr);


  }, [filter]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("Data obtained is ", response.data)
      setCountries(response.data);

    })

  }, [])


  return (
    (<div>find countries <input value={filter} onChange={handleFilterChange}></input>
      {country.length > 10 && <div>Too many matches, specify another filter</div>}
      {country.length == 1 && <ShowCountry country={country[0]}></ShowCountry>}

      {country.length == 0 && <div>No match found</div>}
      {country.length > 1 && country.length < 10 && country.map(c => (<div key={c.name.common}>{c.name.common}

        <button value={c.name.common} onClick={() => setCountry([c])} >{"show"}</button>
      </div>))}

    </div>)
  );




}
const ShowCountry = (props) => {
  console.log(props)
  let country = props.country;
  console.log(country.capital)
  let capitalsArr = country.capital.map(c => c + ", ")
  let lastEle = capitalsArr[capitalsArr.length - 1]
  lastEle = lastEle.substring(0, lastEle.length - 2)
  capitalsArr[capitalsArr.length - 1] = lastEle;

  return (<div><h2>{country.name.common}</h2>
    <div>capital {capitalsArr}</div>
    <div>area {country.area}</div>
    <br></br>
    <div><b>languages:</b>

      {Object.values(country.languages).map(l => <li>{l}</li>)}
    </div>
    <br></br>
    <img src={country.flags["png"]} width={150} height={150}></img>
    <h3>Weather in {country.capital[0]}</h3>
    <div>temperature </div>
  </div>)


}



export default App;
