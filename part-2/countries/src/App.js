import axios from 'axios'
import { useState, useEffect } from 'react'
import Countries from "./components/Countries"

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(countries)
  const [weatherData, setWeatherData] = useState(null)
  const handleClick = countryName => {
    setFilter(countryName);
  };


  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data) 
      setFilter(response.data)
       })
  },[])
    
  useEffect(() => {
    if (filter.length === 1) {
      const capital = filter.map(country => country.capital);
    
        axios
        .get("https://api.openweathermap.org/data/2.5/weather?q="+capital[0]+"&appid=72fa341bb98ce056075c285230b1a20b")
        .then(response => {
            setWeatherData(response.data);
            console.log("done")
          });
      
    }
  }, [filter]);

console.log(weatherData)

  const handleSearchChange = (e) => { 
    const searchCountry = e.target.value;
    setSearch(searchCountry)
    const newCountries = countries.filter(
      (c) => c.name.common.toLowerCase().search(searchCountry.toLowerCase()) !== -1)
    setFilter(newCountries)
  }
  console.log(filter.length)

  return (
    <div>
    <input onChange={handleSearchChange}/>
    <Countries countries={filter} handleClick={handleClick} weatherData={weatherData}/>
    <img src="https://i.imgur.com/MalyWVv.png"/>
    </div>
  )
}
 
export default App