import { Query } from 'react-apollo'
import gql from 'graphql-tag'


export const weatherQuery = gql`
  query weather($skip: Int!) {
    weather(offset: $skip, limit: 5) {
      id
      average_temp
    }
    weather_aggregate {
      aggregate {
        count
      }
    }  
}
`

export const weatherQueryVars = {
  skip: 0,
}
export let getLength = 0;

// This part of the code retrieves data from the PostGresSQL database. Uses <Query> </Query> for the gql tag
export default function WeatherList () {
  return (
    <Query query={weatherQuery} variables={weatherQueryVars}>
      
      {({ loading, error, data: { weather, weather_aggregate }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading weathers.' />
        if (loading) return <div>Loading</div>

        const areMoreweathers = weather.length < weather_aggregate.aggregate.count;
        // {getLength = weather_aggregate.aggregate.count + 1}

        return (
          <section>
            <ul>
              
              {weather.map((entry, index) => (
                <li key={entry.id}>
                  <div>
                    <span>{index + 1}. </span>
                    <a>{entry.average_temp}</a>
                  </div>
                </li>
              ))}
            </ul>
            {areMoreweathers ? (
              <button onClick={() => loadMoreweathers(weather, fetchMore)}>
                {' '}
                {loading ? 'Loading...' : 'Show More'}{' '}
              </button>
            ) : (
              ''
            )}
            <style jsx>{`
              section {
                padding-bottom: 20px;
              }
              li {
                display: block;
                margin-bottom: 10px;
              }
              div {
                align-items: center;
                display: flex;
              }
              a {
                font-size: 14px;
                margin-right: 10px;
                text-decoration: none;
                padding-bottom: 0;
                border: 0;
              }
              span {
                font-size: 14px;
                margin-right: 5px;
              }
              ul {
                margin: 0;
                padding: 0;
              }
              button:before {
                align-self: center;
                border-style: solid;
                border-width: 6px 4px 0 4px;
                border-color: #ffffff transparent transparent transparent;
                content: '';
                height: 0;
                margin-right: 5px;
                width: 0;
              }
            `}</style>
                    
          </section>
          
        )
      }}
    </Query>
  )
}

//Boilerplate code - This function is used on line 43 if theres is a lot of data to be loaded, which prompts the user to click "Read More"
function loadMoreweathers (weather, fetchMore) {
  fetchMore({
    variables: {
      skip: weather.length
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return previousResult
      }
      return Object.assign({}, previousResult, {
        // Append the new results to the old one
        weather: [...previousResult.weather, ...fetchMoreResult.weather]
      })
    }
  })
}
