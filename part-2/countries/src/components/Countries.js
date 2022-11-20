import React from 'react'


const Countries = ({countries,handleClick,weatherData}) => {


    if(countries.length >= 10) {
        return(
<li>be more specific</li>   
          )
      }
    if(countries.length <= 10 && countries.length > 1) {
        return(
            <>
                {countries.map(country =><li key={country.name.common}>{country.name.common} <button onClick={() => handleClick([country])}>show</button></li>)}   
            </>
        ) 
    }   
    if(countries.length === 1){
        return(
            <>
              {countries.map(country =>
              <div  key={country.name.common}>
              <h1>{country.name.common}</h1>
              <li>Capital: {country.capital}</li>
              <li>Area: {country.area}</li>

              </div>)}  
              <h3>Languages:</h3>
      <ul>
        {Object.values(countries[0].languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
    
            <img src={countries[0].flags.png} alt="flag"/>
        
            
    {weatherData && (
      <div>
        <h2>temperature: {Math.trunc( weatherData?.main.temp-273.15)} °C</h2>
        <img src={"https://openweathermap.org/img/wn/"+weatherData?.weather[0].icon+"@2x.png"}  alt='icon'/>
        <h2>Wind:  {weatherData?.wind.speed} m/s</h2> 
      </div>
    )}
 
            </>
        ) 
    }

    }


export default Countries