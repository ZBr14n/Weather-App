import App from '../components/App';
import Header from '../components/Header';
import fetch from 'isomorphic-unfetch';


export let Celcius_to_Fahrenheit = (temp) => {
  return Math.round((temp * 9/5) + 32);
}

export let store = 0;



const Weather = (props) => (

  <App>
     
    <Header />
    
    <ul>
      {/* add image here; compare openweather and accuweather weather state
      conditon; if both e.g. says Cloudy, then display correct MetaWeather Icon based on that. 
      (may require searching and determine unknown text)
      */}



      {/* What is the average of the temperatures?  */}
      {/* Celcius_to_Fahrenheit() will convert MetaWeather celsius temperature to Fahrenheit so that it has the right units aligned for finding the average from the data sources.  */}
      {/* <div>{props.weather[0].consolidated_weather[0].the_temp + props.weather[1].main.temp}</div> */}
      


      {/* <input type="text" value={(Celcius_to_Fahrenheit(props.weather[0].consolidated_weather[0].the_temp) + props.weather[1].main.temp)/2} />       */}
      {/* <button type="submit" onClick={() => store = (Celcius_to_Fahrenheit(props.weather[0].consolidated_weather[0].the_temp) + props.weather[1].main.temp)/2} > Get Average</button> */}
      {store = Math.round((Celcius_to_Fahrenheit(props.weather[0].consolidated_weather[0].the_temp) + props.weather[1].main.temp)/2)}
      
    </ul>       
    
    
  </App>
  
)


Weather.getInitialProps = async function() {
  
  const urls = ["https://www.metaweather.com/api/location/2367105/","http://api.openweathermap.org/data/2.5/weather?id=4930956&APPID=d99e8da076ddb99752f4903be2f2b527&units=imperial"
               ];

  const promises = urls.map(url => fetch(url).then(res => res.json()))
  const weather = await Promise.all(promises).then(res => {return res})
  
  return{
    weather    
  };
};


export default Weather;