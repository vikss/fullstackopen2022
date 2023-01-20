import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
require('dotenv').config();



const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  const handleFilterChange = (event) => {
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
      {country.length == 1 && <ShowCountry country={country[0]} api_key={api_key}></ShowCountry>}

      {country.length == 0 && <div>No match found</div>}
      {country.length > 1 && country.length < 10 && country.map(c => (<div key={c.name.common}>{c.name.common}

        <button value={c.name.common} onClick={() => setCountry([c])} >{"show"}</button>
      </div>))}

    </div>)
  );




}
const ShowCountry = (props) => {

  let country = props.country;
  const [weatherInfo, setweatherInfo] = useState({})
  let capitalsArr = country.capital.map(c => c + ", ")
  let lastEle = capitalsArr[capitalsArr.length - 1]
  lastEle = lastEle.substring(0, lastEle.length - 2)
  capitalsArr[capitalsArr.length - 1] = lastEle;

  useEffect(() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${props.api_key}&units=metric`
    axios.get(url).then((result) => {

      console.log(result.data);

      setweatherInfo({ temp: result.data.main.temp, wind: result.data.wind.speed, icon: result.data.weather[0].icon })

    })




  }, [])

  return (<div><h2>{country.name.common}</h2>
    <div>capital {capitalsArr}</div>
    <div>area {country.area}</div>
    <br></br>
    <div><b>languages:</b>

      {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
    </div>
    <br></br>
    <img src={country.flags["png"]} width={150} height={150}></img>
    <h3>Weather in {country.capital[0]}</h3>
    <div>temperature {weatherInfo.temp} Celsius</div>
    <img src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}></img>
    <div>wind {weatherInfo.wind} m/s</div>
  </div>)


}



export default App;
