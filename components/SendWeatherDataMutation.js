import gql from 'graphql-tag'
import { Mutation } from "react-apollo"
import {store} from '../pages/weather_data'
// import {getLength} from './WeatherList'

{/* https://www.howtographql.com/react-apollo/3-mutations-creating-links/ */}

export const uploadMutation = gql`
    mutation WeatherMutation($average_temp: Float!){
        insert_weather(objects: {average_temp: $average_temp}) {
        returning{
            id
            average_temp
        }
        affected_rows
        }
    }
`

export const uploadMutationVar = {average_temp: store}


export default function SendWeatherDataMutation(){      
    // const btnSize = {
    //     width: '65px',
    //     height: '30px',
        
    // };
    
    return(
        
        <Mutation mutation={uploadMutation} variables={uploadMutationVar}>
            {(entry)=>(
                <form onSubmit={entry}>
                    <button type="submit">Upload</button>                
                </form>                
            )}

        </Mutation>       
    );
}