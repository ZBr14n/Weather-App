import App from '../components/App'
import Header from '../components/Header'
// import {store} from './weather_data'
import SendWeatherDataMutation from '../components/SendWeatherDataMutation'
import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch'
import {Celcius_to_Fahrenheit} from './weather_data'


export default class extends Component{

  static async getInitialProps(){
    const MetaWeather_URL = await fetch('https://www.metaweather.com/api/location/2367105/')
    const data = await MetaWeather_URL.json()
    return {data}
  }
  componentWillMount(){
    this.setState({data: this.props.data})
  }
  

  SelectWeatherIcon = (weather_state) => {

    switch(weather_state){
      case 'Clear':
        return <img src="https://www.metaweather.com/static/img/weather/c.svg" width="150" height="150" />
      case 'Heavy Cloud':
        return <img src="https://www.metaweather.com/static/img/weather/hc.svg" width="150" height="150" />
      case 'Light Cloud':
          return <img src="https://www.metaweather.com/static/img/weather/lc.svg" width="150" height="150" />
      case 'Showers':
          return <img src="https://www.metaweather.com/static/img/weather/s.svg" width="150" height="150" />
      case 'Light Rain':
          return <img src="https://www.metaweather.com/static/img/weather/lr.svg" width="150" height="150" />
      case 'Heavy Rain':
          return <img src="https://www.metaweather.com/static/img/weather/hr.svg" width="150" height="150" />
      case 'Thunderstorm':
          return <img src="https://www.metaweather.com/static/img/weather/t.svg" width="150" height="150" />
      case 'Hail':
          return <img src="https://www.metaweather.com/static/img/weather/h.svg" width="150" height="150" />          
      case 'Sleet':
          return <img src="https://www.metaweather.com/static/img/weather/sl.svg" width="150" height="150" />          
      case 'Snow':
          return <img src="https://www.metaweather.com/static/img/weather/sn.svg" width="150" height="150" />                                  
    }
  }


  
  render(){
    return(
      <App>
        <Header />
        
        <div className="location">Boston, MA</div>

        <div className="Weather">
            <div className="WeatherStateName">
              {/* Weather State Name (e.g. Light Cloud, Heavy Cloud, Clear) */}
              {this.state.data.consolidated_weather[0].weather_state_name}
              <br />
            </div>


            <div className="WeatherIcon">
              {/* Determine the correct icon to show based on Weather State Name */}
              {this.SelectWeatherIcon(this.state.data.consolidated_weather[0].weather_state_name)}
              <br /><br />
            </div>


            <div className="WeatherCond">
              {/* Display the temperature in Fahrenheit*/}
              {Celcius_to_Fahrenheit(this.state.data.consolidated_weather[0].the_temp)} 
            </div>
            <h3>&#8457;</h3>
        </div>

        
        <style jsx>
          {`
            .location{
              font-size: 20px;
              text-align: center;
              position: relative;
              left: 118px;
              top: 30px;
            }

            .WeatherIcon{
              position: relative;
              right: 50px;
            }

            .WeatherStateName{
              position: relative;
              top: 120px;
              left: 118px;
            }


            .Weather{
              text-align: center;              
            }


            .WeatherCond{
              font-size: 80px;  
              position: relative;
              bottom: 150px;
              left: 100px;
            }
            h3{
              font-size: 40px;
              position: relative;
              bottom: 275px;
              left: 170px;
            }
          `}
        </style>
      </App>
    )
  }

}
