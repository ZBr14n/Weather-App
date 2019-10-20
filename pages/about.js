import App from '../components/App'
import Header from '../components/Header'
import WeatherList from '../components/WeatherList'
import SendWeatherDataMutation from '../components/SendWeatherDataMutation'



// This page is use for viewing the logs of weather data.
export default () => (
  
  <App>

    <Header />

    {/* graphql query */}
    <WeatherList />


    {/* graphql mutation */}
    <SendWeatherDataMutation />  
    
  </App>
)
